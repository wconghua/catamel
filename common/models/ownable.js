'use strict';

module.exports = function(Ownable) {
    // to get access to other models
    var app = require('../../server/server');

    Ownable.observe('access', function(ctx, next) {
        const token = ctx.options && ctx.options.accessToken;
        const userId = token && token.userId;
        // const user = userId ? 'user#' + userId : '<anonymous>';
        var UserIdentity = app.models.UserIdentity;
        UserIdentity.findOne({
            where: {
                userId: userId
            }
        }, function(err, instance) {
            //console.log("UserIdentity Instance:",instance)
            if (!instance) {
                // In case of non user accounts (no UserIdentity entry) do nothing
                next()
            } else if (instance.profile) {
                // if user account update where query to append group groupCondition
                const groups = instance.profile.accessGroups || [];
  
                const ownerCondition = {ownerGroup: {inq: groups}};
                let accessCondition;

                if (ctx.Model.getConnector().name === 'oracle') {
                    const likes = groups.map(group => ({accessGroups: {like: '%"' + group + '"%'}}));
                    accessCondition = {or: likes};
                } else {
                    accessCondition = {accessGroups: {in: groups}};
                }

                const canAccessCondition = {or: [ownerCondition, accessCondition]};
                const currentWhere = ctx.query.where;

                ctx.query.where = currentWhere
                    ? {and: [currentWhere, canAccessCondition]}
                    : canAccessCondition;

                // const scope = ctx.query.where ? JSON.stringify(ctx.query.where) : '<all records>';
                // console.log('%s: %s accessed %s:%s', new Date(), instance.profile.login, ctx.Model.modelName, scope);
                next();
            } else {
                // According to: https://loopback.io/doc/en/lb3/Operation-hooks.html
                var e = new Error('Access Not Allowed');
                e.statusCode = 401;
                next(e);
            }
        })
    });

    Ownable.isValid = function(instance, next) {
        var ds = new Ownable(instance)
        ds.isValid(function(valid) {
            if (!valid) {
                next(null, {
                    'errors': ds.errors,
                    'valid': false
                })
            } else {
                next(null, {
                    'valid': true
                })
            }
        });
    }

    Ownable.observe('before save', function(ctx, next) {


        if (ctx.instance) {
            if (ctx.options.accessToken) {
                var User = app.models.User;
                User.findById(ctx.options.accessToken.userId, function(err, instance) {
                    if (instance) {
                        if (ctx.instance.createdBy) {
                            ctx.instance.updatedBy = instance.username;
                        } else {
                            ctx.instance.createdBy = instance.username
                        }
                    } else {
                        if (ctx.instance.createdBy) {
                            ctx.instance.updatedBy = "anonymous";
                        } else {
                            ctx.instance.createdBy = "anonymous"
                        }
                    }
                    next()
                })
            } else {
                if (ctx.instance.createdBy) {
                    ctx.instance.updatedBy = "anonymous";
                } else {
                    ctx.instance.createdBy = "anonymous"
                }
                next();
            }
        } else if (ctx.data) {
            if (ctx.options.accessToken) {
                var User = app.models.User;
                User.findById(ctx.options.accessToken.userId, function(err, instance) {
                    if (instance) {
                        ctx.data.updatedBy = instance.username
                    } else {
                        ctx.data.updatedBy = "anonymous";
                    }
                    next()
                })
            } else {
                ctx.data.updatedBy = "anonymous";
                next();
            }
        }
    });
};
