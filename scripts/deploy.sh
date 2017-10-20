#!/bin/bash 

# export DACATHOME=/home/encima/dev/psi 
# export KUBECONFIG=/home/encima/dev/psi/catamel-psisecrets/server/kubernetes/admin.conf

envarray=(qa production)
hostextarray=('-qa' '')
certarray=('discovery' 'discovery')

kubectl config use-context admin@kubernetes

for ((i=0;i<${#envarray[@]};i++)); do 
   cd $DACATHOME/catanie 
   export CATANIE_IMAGE_VERSION=$(git rev-parse HEAD)
   export LOCAL_ENV="${envarray[i]}"
   export PORTOFFSET="${portarray[i]}"
   export HOST_EXT="${hostextarray[i]}"
   export CERTNAME="${certarray[i]}"
   echo $LOCAL_ENV $PORTOFFSET $HOST_EXT
   echo $LOCAL_ENV 
   echo pwd
   echo "Building release"
   ./node_modules/@angular/cli/bin/ng build --environment $LOCAL_ENV -op dist/$LOCAL_ENV
   docker build -t registry.psi.ch:5000/egli/catanie:$CATANIE_IMAGE_VERSION$LOCAL_ENV --build-arg env=$LOCAL_ENV .
   docker push registry.psi.ch:5000/egli/catanie:$CATANIE_IMAGE_VERSION$LOCAL_ENV
   cd  $DACATHOME/catamel-psiconfig/server/kubernetes/helm/ 
   echo "Deploying to Kubernetes"
   helm del --purge catanie-$LOCAL_ENV
   helm install dacat-gui --name catanie-$LOCAL_ENV --namespace $LOCAL_ENV --set image.tag=$CATANIE_IMAGE_VERSION$LOCAL_ENV
done