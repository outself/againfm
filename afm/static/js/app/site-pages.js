/**
 * Представление панели с контентом.
 *
 * @type {function}
 */
App.PanelBox = App.View.extend({
    el: '.panel-box',
    events: {
        'click .close': 'hide'
    },

    show: function(view) {
        if (this.view) {
            this.view.remove();
        }
        // прокидываем во вьюху ссылку на лейаут, путь делает что хочет :)
        view.layout = this;
        view.render();
        this.$el.css('top', $(window).height()).show().animate({top: 60}, 450, 'linear');
        this.view = view;
    },

    hide: function() {
        this.$el.animate({top: $(window).height()}, 'linear', _.bind(function(){
            this.$el.hide();
            // убиваем после анимации, иначе при скрытии виден только пустой контейнер
            if (this.view) {
                this.view.remove();
                this.view = null;
            }
        }, this));
        this.trigger('hide');
    }
});

App.PanelView = App.View.extend({
    render: function() {
        this.setElement(this.template());
        this.layout.$el.html(this.$el);
    },

    hide: function() {
        this.layout.$el.hide();
    }
});

App.AboutView = App.PanelView.extend({
    template: App.getTemplate('about')
});

App.TosView = App.PanelView.extend({
    template: App.getTemplate('tos')
});

App.FeedbackView = App.View.extend({
    el: '.feedback-box',
    events: {
        'submit form': 'submit',
        'click .close': 'hide'
    },

    initialize: function() {
        this.setupValidator();
    },

    show: function() {
        this.$el.css('left', $('a.feedback').position().left);
        this.$el.fadeIn();
    },

    hide: function() {
        this.$el.fadeOut(function(){
            // сбрасываем класс результата после скрытия
            $(this).removeClass('complete');
        });
        // кидаем событие и роутер меняет url на предыдущий
        this.trigger('hide');
    },

    toggle: function() {
        if (this.$el.is(':visible')) {
            this.hide();
        } else {
            this.show();
        }
    },

    submit: function() {
        this.ajaxButton(function(){
            return $.post('/api/feedback', this.serializeForm()).always(_.bind(function(){
                // видимость элементов меняется через класс complete
                this.$el.addClass('complete');
                // после отправки, показав результат и чуток подождав, скрываем всю форму
                _.delay(_.bind(this.hide, this), 1400);
            }, this));
        }, 'sending');
        return false;
    },

    setupValidator: function() {
        this.validator = new FormValidator(this.$('form'), {
            rules: {
                text: {required: true},
                email: {required: true}
            }
        });
        this.validator.on('validate_field', function(field, error){
            field.toggleClass('error', !!error);
        });
        this.validator.on('validate', function(valid){
            this.$('form :submit').prop('disabled', !valid);
        }, this);
        this.validator.validateForm();
    }
});