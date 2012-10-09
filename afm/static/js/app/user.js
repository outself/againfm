var App = App || {};

App.User = App.Model.extend({
    url: '/api/user/',
    mediator: App.mediator,

    initialize: function() {
        this.publishEvents('logged logout', this.mediator, 'user');
        this.on('change:id', function() {
            if (this.isLogged()) {
                this.trigger('logged', this);
            } else {
                this.trigger('logout');
            }
        }, this);
    },

    login: function(params, options) {
        if (this.isLogged()) {
            return;
        }

        var self = this;
        $.post(this.url + 'login', params, function(user){
            if (user.error) {
                self.trigger('login.error', user.error);
            } else {
                self.set(user);
            }
        });
    },

    logout: function() {
        if (!this.isLogged()) {
            return;
        }

        var self = this;
        $.post(this.url + 'logout').always(function(){
            self.clear();
        });
    },

    isLogged: function() {
        return this.has('id');
    }
});

App.FormView = App.View.extend({
    initialize: function(options) {
        this.render();
    },

    render: function() {
        this.validator();
    },

    validator: function() {
        var options = $.extend({
            focusInvalid: false,
            //onfocusout: true,
            //onkeyup: true,
            ignoreTitle: true
        }, this.validation);
        console.log(options);
        return this.$el.validate(options);
    }
});

App.LoginFormView = App.FormView.extend({
    el: 'form.login',
    validation: {
        validClass: false,
        rules: {
            login: {required: true},
            password: {required: true}
        }
    },

    initialize: function() {
        //this.validation.success = _.bind(function() {
        //    console.log('success');
        //}, this);
        this.validation.showErrors = _.bind(function() {
            console.log(arguments);
            this.$(':submit').prop('disabled', true);
        }, this);
        this.render();
    },

    toggleButton: function() {

    },

    submit: function() {

    }
});

/**
 * Представление формы логина.
 *
 * @type {function}
 */
App.LoginFormView = App.View.extend({
    el: 'form.login',
    events: {
        'submit': 'submit'
    },
    valid: false,

    initialize: function(options) {
        this.user = options.user;
        this.$(':text, :password').keyup(_.bind(this.validate, this));
        this.user.on('logged', this.userLogged, this);
        this.user.on('logout', this.show, this);
        this.user.on('login.error', function(error){
            this.$('.notice').addClass('notice-error').show().text(error);
        }, this);
    },

    userLogged: function() {
        // очищаем сообщение об ошибке
        this.$('.notice').removeClass('notice-error').text('');
        // сбрасываем и скрываем форму
        this.el.reset();
        this.$el.hide();
    },

    validate: function() {
        var valid = true;
        this.$(':text, :password').each(function(){
            var val = $.trim(this.value);
            if (!val) {
                valid = false;
            }
        });
        this.$(':submit').prop('disabled', !valid);
        this.valid = valid;
    },

    submit: function() {
        if (!this.valid) {
            return false;
        }
        this.user.login(this.serializeForm());
        return false;
    }
});

$(function(){
    App.user = new App.User();
    App.loginForm = new App.LoginFormView({user: App.user});
})