(function(){var a=Handlebars.template,b=Handlebars.templates=Handlebars.templates||{};b.about=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression;return f+="<h1>",h=c.t,g=h?h.call(b,"about.title",{hash:{}}):i.call(b,"t","about.title",{hash:{}}),f+=j(g)+'</h1>\n<div class="about">\n    <p>cool site</p>\n</div>\n<div class="close"></div>',f}),b.autocomplete_item=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression;return f+="<li><a><strong>",h=c.label,h?g=h.call(b,{hash:{}}):(g=b.label,g=typeof g===i?g():g),f+=j(g)+"</strong><br />",h=c.tag,h?g=h.call(b,{hash:{}}):(g=b.tag,g=typeof g===i?g():g),f+=j(g)+"</a></li>",f}),b.display_selector=a(function(a,b,c,d,e){function k(a,b){var d="",e,f;d+="\n        ",d+="\n        <span",e=a.active,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(2,l,b)});if(e||e===0)d+=e;return d+=">",f=c.title,f?e=f.call(a,{hash:{}}):(e=a.title,e=typeof e===i?e():e),d+=j(e)+"</span>\n    ",d}function l(a,b){return' class="active"'}function m(a,b){var d="",e,f;d+="\n        ",d+='\n        <span class="icon-selector ',f=c["class"],f?e=f.call(a,{hash:{}}):(e=a["class"],e=typeof e===i?e():e),d+=j(e)+"-selector",e=a.active,e=c["if"].call(a,e,{hash:{},inverse:h.noop,fn:h.program(5,n,b)});if(e||e===0)d+=e;return d+='" title="',f=c.hint,f?e=f.call(a,{hash:{}}):(e=a.hint,e=typeof e===i?e():e),d+=j(e)+'"></span>\n    ',d}function n(a,b){var d="",e,f;return d+=" ",f=c["class"],f?e=f.call(a,{hash:{}}):(e=a["class"],e=typeof e===i?e():e),d+=j(e)+"-active",d}c=c||a.helpers;var f="",g,h=this,i="function",j=this.escapeExpression;f+="<li>\n    ",g=b.title,g=c["if"].call(b,g,{hash:{},inverse:h.program(4,m,e),fn:h.program(1,k,e)});if(g||g===0)f+=g;return f+="\n</li>",f}),b.empty_favorites_scale=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression;return f+='<ul class="line1">\n    <li style="left:45%">',h=c.t,g=h?h.call(b,"display.empty_favorites.title",{hash:{}}):i.call(b,"t","display.empty_favorites.title",{hash:{}}),f+=j(g)+'</li>\n</ul>\n<ul class="line2">\n    <li style="left:33%">',h=c.t,g=h?h.call(b,"display.empty_favorites.hint",{hash:{}}):i.call(b,"t","display.empty_favorites.hint",{hash:{}}),f+=j(g)+'</li>\n</ul>\n<ul class="line3"></ul>\n<ul class="line4"></ul>\n',f}),b.favorites_label=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g="function",h=this.escapeExpression;return f+='<tr><td colspan="3" class="label"><fieldset><legend>',b=typeof b===g?b():b,f+=h(b)+"</legend></fieldset></td></tr>",f}),b.password_reset=a(function(a,b,c,d,e){function m(a,b){var d="",e,f;return d+='\n                    <a href="http://',f=c.email_provider,f?e=f.call(a,{hash:{}}):(e=a.email_provider,e=typeof e===i?e():e),d+=j(e)+'/" target="_blank">',f=c.t,e=f?f.call(a,"amnesia.result.check_email",{hash:{}}):k.call(a,"t","amnesia.result.check_email",{hash:{}}),d+=j(e)+"</a>\n                    (",f=c.t,e=f?f.call(a,"amnesia.result.link_hint",{hash:{}}):k.call(a,"t","amnesia.result.link_hint",{hash:{}}),d+=j(e)+")\n                ",d}function n(a,b){var d="",e,f;return d+="\n                    ",f=c.t,e=f?f.call(a,"amnesia.result.check_email",{hash:{}}):k.call(a,"t","amnesia.result.check_email",{hash:{}}),d+=j(e)+".\n                ",d}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=c.helperMissing,l=this;f+='<div class="wrapper-left">\n    <div class="wrapper-left-content">\n        <h1>',h=c.t,g=h?h.call(b,"amnesia.title",{hash:{}}):k.call(b,"t","amnesia.title",{hash:{}}),f+=j(g)+'</h1>\n    </div>\n</div>\n<div class="wrapper-right">\n    <div class="wrapper-right-content">\n        <form class="head-form amnesia">\n            <p class="notice password-reset">\n                <strong>',h=c.t,g=h?h.call(b,"amnesia.result.title",{hash:{}}):k.call(b,"t","amnesia.result.title",{hash:{}}),f+=j(g)+"</strong>\n                ",g=b.email_provider,g=c["if"].call(b,g,{hash:{},inverse:l.program(3,n,e),fn:l.program(1,m,e)});if(g||g===0)f+=g;return f+='\n            </p>\n        </form>\n        <div class="close-box">\n            <div class="close"><span class="pseudo-link">',h=c.t,g=h?h.call(b,"topbox.cancel",{hash:{}}):k.call(b,"t","topbox.cancel",{hash:{}}),f+=j(g)+"</span></div>\n        </div>\n    </div>\n</div>\n\n",f}),b.scale=a(function(a,b,c,d,e){return c=c||a.helpers,'<ul class="scale line1"></ul>\n<ul class="scale line2"></ul>\n<ul class="scale line3"></ul>\n<ul class="scale line4"></ul>\n<div class="scale-slider"></div>\n'}),b.sticker=a(function(a,b,c,d,e){function l(a,b){var d="",e;d+='\n        <div class="station bookmark-station',e=a.station,e=e==null||e===!1?e:e.favorite,e=c["if"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(2,m,b)});if(e||e===0)d+=e;return d+='">\n            <i class="icon"></i>\n            ',e=a.station,e=e==null||e===!1?e:e.title,e=typeof e===j?e():e,d+=k(e)+"\n        </div>\n    ",d}function m(a,b){return" favorite-station"}function n(a,b){var c="",d;return c+='\n        <div class="station">',d=a.station,d=d==null||d===!1?d:d.title,d=typeof d===j?d():d,c+=k(d)+"</div>\n    ",c}function o(a,b){var d="",e;d+='\n    <div class="bookmark-track',e=a.favorite_track,e=c["if"].call(a,e,{hash:{},inverse:i.noop,fn:i.program(7,p,b)});if(e||e===0)d+=e;return d+='"></div>\n',d}function p(a,b){return" favorite-track"}c=c||a.helpers;var f="",g,h,i=this,j="function",k=this.escapeExpression;f+='<img src="',h=c.image_url,h?g=h.call(b,{hash:{}}):(g=b.image_url,g=typeof g===j?g():g),f+=k(g)+'" width="78" height="78" />\n<div class="radio-sticker-content">\n    <h1 title="',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===j?g():g),f+=k(g)+'">\n        <span class="title-inner">',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===j?g():g),f+=k(g)+'</span>\n    </h1>\n    <h2 title="',h=c.subtitle,h?g=h.call(b,{hash:{}}):(g=b.subtitle,g=typeof g===j?g():g),f+=k(g)+'">',h=c.subtitle,h?g=h.call(b,{hash:{}}):(g=b.subtitle,g=typeof g===j?g():g),f+=k(g)+"</h2>\n    ",g=b.has_station_favorite,g=c["if"].call(b,g,{hash:{},inverse:i.program(4,n,e),fn:i.program(1,l,e)});if(g||g===0)f+=g;f+="\n</div>\n\n",g=b.has_track_favorite,g=c["if"].call(b,g,{hash:{},inverse:i.noop,fn:i.program(6,o,e)});if(g||g===0)f+=g;return f}),b.top_holder=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=c.helperMissing;f+='<div class="form-holder ',h=c.layout_class,h?g=h.call(b,{hash:{}}):(g=b.layout_class,g=typeof g===i?g():g),f+=j(g)+'">\n    <div class="wrapper-left">\n        <div class="wrapper-left-content">\n            <h1>',h=c.title,h?g=h.call(b,{hash:{}}):(g=b.title,g=typeof g===i?g():g),f+=j(g)+'</h1>\n        </div>\n    </div>\n    <div class="wrapper-right">\n        <div class="wrapper-right-content">\n            ',h=c.content,h?g=h.call(b,{hash:{}}):(g=b.content,g=typeof g===i?g():g);if(g||g===0)f+=g;return f+='\n            <div class="close-box">\n                <div class="close"><span class="pseudo-link">',h=c.t,g=h?h.call(b,"topholder.cancel",{hash:{}}):k.call(b,"t","topholder.cancel",{hash:{}}),f+=j(g)+"</span></div>\n            </div>\n        </div>\n    </div>\n</div>",f}),b.tos=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression;return f+="<h1>",h=c.t,g=h?h.call(b,"tos.title",{hash:{}}):i.call(b,"t","tos.title",{hash:{}}),f+=j(g)+'</h1>\n<div class="about">\n    <p>cool site</p>\n</div>\n<div class="close"></div>',f}),b.user_amnesia=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression,k="function";return f+='<div class="wrapper-left">\n    <div class="wrapper-left-content">\n        <h1>',h=c.t,g=h?h.call(b,"amnesia.title",{hash:{}}):i.call(b,"t","amnesia.title",{hash:{}}),f+=j(g)+'</h1>\n    </div>\n</div>\n<div class="wrapper-right">\n    <div class="wrapper-right-content">\n        <form class="head-form amnesia">\n            <div class="form-input">\n                <input type="text" tabindex="30" class="input" name="email" placeholder="',h=c.t,g=h?h.call(b,"amnesia.placeholder",{hash:{}}):i.call(b,"t","amnesia.placeholder",{hash:{}}),f+=j(g)+'" value="',h=c.email,h?g=h.call(b,{hash:{}}):(g=b.email,g=typeof g===k?g():g),f+=j(g)+'" />\n            </div>\n            <input type="submit" class="button" tabindex="31" disabled="disabled" value="',h=c.t,g=h?h.call(b,"amnesia.button",{hash:{}}):i.call(b,"t","amnesia.button",{hash:{}}),f+=j(g)+'" />\n            <p class="notice">',h=c.t,g=h?h.call(b,"amnesia.notice",{hash:{}}):i.call(b,"t","amnesia.notice",{hash:{}}),f+=j(g)+'</p>\n        </form>\n        <div class="close-box">\n            <div class="close"><span class="pseudo-link">',h=c.t,g=h?h.call(b,"topbox.cancel",{hash:{}}):i.call(b,"t","topbox.cancel",{hash:{}}),f+=j(g)+"</span></div>\n        </div>\n    </div>\n</div>\n",f}),b.user_email_exists=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression,k="function";return h=c.t,g=h?h.call(b,"signup.exists_email",{hash:{}}):i.call(b,"t","signup.exists_email",{hash:{}}),f+=j(g)+' <a href="',h=c.link,g=h?h.call(b,"amnesia",{hash:{}}):i.call(b,"link","amnesia",{hash:{}}),f+=j(g)+"/",h=c.email,h?g=h.call(b,{hash:{}}):(g=b.email,g=typeof g===k?g():g),f+=j(g)+'">',h=c.t,g=h?h.call(b,"amnesia.link",{hash:{}}):i.call(b,"t","amnesia.link",{hash:{}}),f+=j(g)+"</a>",f}),b.user_favorite=a(function(a,b,c,d,e){function m(a,b){return" deleted"}c=c||a.helpers;var f="",g,h,i=this,j="function",k=this.escapeExpression,l=c.helperMissing;f+='<tr class="favorite',g=b.favorite,g=c.unless.call(b,g,{hash:{},inverse:i.noop,fn:i.program(1,m,e)});if(g||g===0)f+=g;return f+='" data-ts="',h=c.created_at,h?g=h.call(b,{hash:{}}):(g=b.created_at,g=typeof g===j?g():g),f+=k(g)+'" data-cid="',h=c.cid,h?g=h.call(b,{hash:{}}):(g=b.cid,g=typeof g===j?g():g),f+=k(g)+'">\n    <td class="state">',g=b.created_at,h=c.time,g=h?h.call(b,g,{hash:{}}):l.call(b,"time",g,{hash:{}}),f+=k(g)+'</td>\n    <td class="content">\n        <h2 class="favorite-title">',g=b.track,g=g==null||g===!1?g:g.title,g=typeof g===j?g():g,f+=k(g)+"</h2>\n        ",f+='\n        <h3>@ <span class="pseudo-link station" data-id="',g=b.station,g=g==null||g===!1?g:g.id,g=typeof g===j?g():g,f+=k(g)+'" data-title="',g=b.station,g=g==null||g===!1?g:g.title,g=typeof g===j?g():g,f+=k(g)+'">',g=b.station,g=g==null||g===!1?g:g.title,g=typeof g===j?g():g,f+=k(g)+'</span></h3>\n    </td>\n    <td class="buttons">\n        <a class="vk" href="http://vk.com/search?c[q]=',g=b.track,g=g==null||g===!1?g:g.title,h=c.escape_uri_comp,g=h?h.call(b,g,{hash:{}}):l.call(b,"escape_uri_comp",g,{hash:{}}),f+=k(g)+'&c[section]=audio" target="_blank"></a>\n        <a class="google" href="http://www.google.com/search?q=',g=b.track,g=g==null||g===!1?g:g.title,h=c.escape_uri_comp,g=h?h.call(b,g,{hash:{}}):l.call(b,"escape_uri_comp",g,{hash:{}}),f+=k(g)+'" target="_blank"></a>\n        <a class="lastfm" href="http://www.lastfm.ru/search?q=',g=b.track,g=g==null||g===!1?g:g.title,h=c.escape_uri_comp,g=h?h.call(b,g,{hash:{}}):l.call(b,"escape_uri_comp",g,{hash:{}}),f+=k(g)+'&type=track" target="_blank"></a>\n    </td>\n</tr>',f}),b.user_favorites=a(function(a,b,c,d,e){function m(a,b){var d="",e,f;d+='\n        <table class="favorites">\n            ',f=c.content,f?e=f.call(a,{hash:{}}):(e=a.content,e=typeof e===i?e():e);if(e||e===0)d+=e;return d+="\n        </table>\n    ",d}function n(a,b){var d="",e,f;return d+='\n        <div class="help">\n            <p>',f=c.t,e=f?f.call(a,"favorites.helptext1",{hash:{}}):j.call(a,"t","favorites.helptext1",{hash:{}}),d+=k(e)+'</p>\n            <img src="/static/i/radionow.png" width="386" height="100" alt="" />\n            <p>',f=c.t,e=f?f.call(a,"favorites.helptext2",{hash:{}}):j.call(a,"t","favorites.helptext2",{hash:{}}),d+=k(e)+"</p>\n        </div>\n    ",d}c=c||a.helpers;var f="",g,h,i="function",j=c.helperMissing,k=this.escapeExpression,l=this;f+="<h1>",h=c.t,g=h?h.call(b,"favorites.title",{hash:{}}):j.call(b,"t","favorites.title",{hash:{}}),f+=k(g)+'</h1>\n<div class="user-favorites">\n    ',g=b.content,g=c["if"].call(b,g,{hash:{},inverse:l.program(3,n,e),fn:l.program(1,m,e)});if(g||g===0)f+=g;return f+='\n</div>\n<div class="close"></div>\n\n\n\n\n',f}),b.user_login=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression;return f+='<div class="form-input">\n    <input type="text" tabindex="10" class="input" name="login"\n           placeholder="',h=c.t,g=h?h.call(b,"login.placeholder.login",{hash:{}}):i.call(b,"t","login.placeholder.login",{hash:{}}),f+=j(g)+'"/>\n    <span class="pseudo-link signup">',h=c.t,g=h?h.call(b,"signup.link",{hash:{}}):i.call(b,"t","signup.link",{hash:{}}),f+=j(g)+'</span>\n</div>\n<div class="form-input">\n    <input type="password" tabindex="11" class="input" name="password"\n           placeholder="',h=c.t,g=h?h.call(b,"login.placeholder.password",{hash:{}}):i.call(b,"t","login.placeholder.password",{hash:{}}),f+=j(g)+'"/>\n    <span class="pseudo-link amnesia">',h=c.t,g=h?h.call(b,"amnesia.link",{hash:{}}):i.call(b,"t","amnesia.link",{hash:{}}),f+=j(g)+'</span>\n</div>\n<input type="submit" class="button" disabled="disabled" tabindex="12" value="',h=c.t,g=h?h.call(b,"login.button",{hash:{}}):i.call(b,"t","login.button",{hash:{}}),f+=j(g)+'"/>\n<p class="notice"></p>\n',f}),b.user_settings=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression,k="function";return f+="<h1>",h=c.t,g=h?h.call(b,"settings.title",{hash:{}}):i.call(b,"t","settings.title",{hash:{}}),f+=j(g)+'</h1>\n<div class="user-settings">\n<fieldset>\n    <legend>',h=c.t,g=h?h.call(b,"settings.playback",{hash:{}}):i.call(b,"t","settings.playback",{hash:{}}),f+=j(g)+'</legend>\n</fieldset>\n<ul class="checkbox-shift">\n    ',f+="\n    <li>",h=c.setting,g=h?h.call(b,"limit_night_volume",{hash:{}}):i.call(b,"setting","limit_night_volume",{hash:{}}),f+=j(g)+"</li>\n    <li>",h=c.setting,g=h?h.call(b,"fading_sound",{hash:{}}):i.call(b,"setting","fading_sound",{hash:{}}),f+=j(g)+"</li>\n    <li>",h=c.setting,g=h?h.call(b,"spectrum",{hash:{}}):i.call(b,"setting","spectrum",{hash:{}}),f+=j(g)+"</li>\n</ul>\n\n<fieldset>\n    <legend>",h=c.t,g=h?h.call(b,"settings.personal_info.title",{hash:{}}):i.call(b,"t","settings.personal_info.title",{hash:{}}),f+=j(g)+"</legend>\n</fieldset>\n<ul>\n    <li>\n        ",h=c.t,g=h?h.call(b,"settings.personal_info.name",{hash:{}}):i.call(b,"t","settings.personal_info.name",{hash:{}}),f+=j(g)+':\n        <form action="change_name" autocomplete="off" class="change-name">\n            <input name="name" placeholder="',h=c.t,g=h?h.call(b,"settings.personal_info.name",{hash:{}}):i.call(b,"t","settings.personal_info.name",{hash:{}}),f+=j(g)+'" value="',g=b.user,g=g==null||g===!1?g:g.name,g=typeof g===k?g():g,f+=j(g)+'" />\n            <input type="submit" class="btn" disabled="disabled" value="',h=c.t,g=h?h.call(b,"button.change",{hash:{}}):i.call(b,"t","button.change",{hash:{}}),f+=j(g)+'" />\n        </form>\n    </li>\n</ul>\n</div>\n<div class="close"></div>\n',f}),b.user_settings_checkbox=a(function(a,b,c,d,e){function l(a,b){return" disabled"}function m(a,b){var d;return d=a.value,d=c["if"].call(a,d,{hash:{},inverse:i.noop,fn:i.program(4,n,b)}),d||d===0?d:""}function n(a,b){return" active"}c=c||a.helpers;var f="",g,h,i=this,j="function",k=this.escapeExpression;f+='<button class="setting',g=b.disabled,g=c["if"].call(b,g,{hash:{},inverse:i.program(3,m,e),fn:i.program(1,l,e)});if(g||g===0)f+=g;return f+='" data-name="',h=c.name,h?g=h.call(b,{hash:{}}):(g=b.name,g=typeof g===j?g():g),f+=k(g)+'" id="setting-',h=c.name,h?g=h.call(b,{hash:{}}):(g=b.name,g=typeof g===j?g():g),f+=k(g)+'"></button>\n<label for="setting-',h=c.name,h?g=h.call(b,{hash:{}}):(g=b.name,g=typeof g===j?g():g),f+=k(g)+'">',h=c.label,h?g=h.call(b,{hash:{}}):(g=b.label,g=typeof g===j?g():g),f+=k(g)+"\n<small>",h=c.notice,h?g=h.call(b,{hash:{}}):(g=b.notice,g=typeof g===j?g():g),f+=k(g)+"</small></label>",f}),b.user_signup=a(function(a,b,c,d,e){c=c||a.helpers;var f="",g,h,i=c.helperMissing,j=this.escapeExpression;return f+='<div class="wrapper-left">\n    <div class="wrapper-left-content">\n        <h1>',h=c.t,g=h?h.call(b,"signup.title",{hash:{}}):i.call(b,"t","signup.title",{hash:{}}),f+=j(g)+'</h1>\n    </div>\n</div>\n<div class="wrapper-right">\n    <div class="wrapper-right-content">\n        <form class="head-form signup">\n            <div class="form-input">\n                <input type="text" tabindex="20" class="input" name="email" placeholder="',h=c.t,g=h?h.call(b,"signup.placeholder.email",{hash:{}}):i.call(b,"t","signup.placeholder.email",{hash:{}}),f+=j(g)+'" />\n            </div>\n            <div class="form-input">\n                <input type="password" tabindex="21" class="input" name="password" placeholder="',h=c.t,g=h?h.call(b,"signup.placeholder.password",{hash:{}}):i.call(b,"t","signup.placeholder.password",{hash:{}}),f+=j(g)+'" />\n            </div>\n            <input type="submit" class="button" tabindex="22" disabled="disabled" value="',h=c.t,g=h?h.call(b,"signup.button",{hash:{}}):i.call(b,"t","signup.button",{hash:{}}),f+=j(g)+'" />\n            <p class="notice">',h=c.t,g=h?h.call(b,"signup.notice",{hash:{}}):i.call(b,"t","signup.notice",{hash:{}}),f+=j(g)+'</p>\n        </form>\n        <div class="close-box">\n            <div class="close"><span class="pseudo-link">',h=c.t,g=h?h.call(b,"topbox.cancel",{hash:{}}):i.call(b,"t","topbox.cancel",{hash:{}}),f+=j(g)+"</span></div>\n        </div>\n    </div>\n</div>\n\n",f}),b.userbar=a(function(a,b,c,d,e){function m(a,b){var d="",e,f;return d+=" ",f=c.avatar_url,f?e=f.call(a,{hash:{}}):(e=a.avatar_url,e=typeof e===i?e():e),d+=j(e)+" ",d}function n(a,b){var d="",e,f;return d+=" ",e=a.gravatar_hash,f=c.user_gravatar_url,e=f?f.call(a,e,"50",{hash:{}}):k.call(a,"user_gravatar_url",e,"50",{hash:{}}),d+=j(e)+" ",d}function o(a,b){var d,e;return e=c.name,e?d=e.call(a,{hash:{}}):(d=a.name,d=typeof d===i?d():d),j(d)}function p(a,b){var d,e;return e=c.email,e?d=e.call(a,{hash:{}}):(d=a.email,d=typeof d===i?d():d),j(d)}c=c||a.helpers;var f="",g,h,i="function",j=this.escapeExpression,k=c.helperMissing,l=this;f+='<img src="',g=b.avatar_url,g=c["if"].call(b,g,{hash:{},inverse:l.program(3,n,e),fn:l.program(1,m,e)});if(g||g===0)f+=g;f+='" width="50" height="50" alt="" class="avatar" />\n<div class="content">\n    <p>',g=b.name,g=c["if"].call(b,g,{hash:{},inverse:l.program(7,p,e),fn:l.program(5,o,e)});if(g||g===0)f+=g;return f+='</p>\n    <ul>\n        <li class="favorites"><i class="icon"></i>',h=c.t,g=h?h.call(b,"user.favorites",{hash:{}}):k.call(b,"t","user.favorites",{hash:{}}),f+=j(g)+'</li>\n        <li class="settings"><i class="icon"></i>',h=c.t,g=h?h.call(b,"user.settings",{hash:{}}):k.call(b,"t","user.settings",{hash:{}}),f+=j(g)+'</li>\n    </ul>\n</div>\n<div class="logout"></div>',f})})()