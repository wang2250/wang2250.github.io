/* Version 3.4
** QQ:271513820 
** Up:2017.08.04*/
var feifei = {
    //start
    'browser':{//娴忚鍣ㄤ俊鎭�
        'url': document.URL,
        'domain': document.domain,
        'title': document.title,
        'language': (navigator.browserLanguage || navigator.language).toLowerCase(),//zh-tw|zh-hk|zh-cn
        'canvas' : function(){
            return !!document.createElement('canvas').getContext;
        }(),
        'useragent' : function(){
            var ua = navigator.userAgent;//navigator.appVersion
            return {
                'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //鏄惁涓虹Щ鍔ㄧ粓绔� 
                'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢
                'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android缁堢鎴栬€卽c娴忚鍣� 
                'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣� 
                'iPad': ua.indexOf('iPad') > -1, //鏄惁iPad
                'trident': ua.indexOf('Trident') > -1, //IE鍐呮牳
                'presto': ua.indexOf('Presto') > -1, //opera鍐呮牳
                'webKit': ua.indexOf('AppleWebKit') > -1, //鑻规灉銆佽胺姝屽唴鏍�
                'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //鐏嫄鍐呮牳 
                'weixin': ua.indexOf('MicroMessenger') > -1 //鏄惁寰俊 ua.match(/MicroMessenger/i) == "micromessenger",			
            };
        }()
    },
    'mobile':{//绉诲姩绔笓鐢�
        'jump': function(){
            if(cms.domain_m){
                self.location.href = feifei.browser.url.replace(feifei.browser.domain,cms.domain_m);
            }
        },
        'nav': function(){
            $("#ff-nav-btn").bind('click', function(){
                $('#ff-nav-btn-item').toggleClass("hidden");
            });
        },
        'goback': function(){
            if(history.length > 0 && document.referrer){
                $("#ff-goback").show();
                $('#ff-goback').attr('href','javascript:history.go(-1);');
            }else{
                $("#ff-goback").hide();
            }
        },
        'flickity':function($id,$index){//鎵嬫満婊戝姩
            if($(".ff-gallery").length){
                $.ajaxSetup({ 
                    cache: true 
                });
                $("<link>").attr({ rel: "stylesheet",type: "text/css",href: "https://cdn.bootcss.com/flickity/2.0.9/flickity.min.css"}).appendTo("head");
                $.getScript("https://cdn.bootcss.com/flickity/2.0.9/flickity.pkgd.min.js", function(response, status) {
                    $($id).flickity({
                        cellAlign: 'left',
                        freeScroll: true,
                        prevNextButtons: false,
                        resize: true,
                        initialIndex: $index,
                        pageDots: false
                    });
                });
            }
        }
    },
    'alert':{//鎻愮ず
        'success':function($id, $tips){
            $($id).html('<div class="alert alert-success fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>鎴愬姛锛�</strong>'+$tips+'</label>');
        },
        'warning':function($id, $tips){
            $($id).html('<div class="alert alert-warning fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>璀﹀憡锛�</strong>'+$tips+'</label>');
        }
    },
    'language':{//绠€绻佽浆鎹�
        's2t':function(){
            if(feifei.browser.language=='zh-hk' || feifei.browser.language=='zh-tw'){
                $.getScript("http://cdn.feifeicms.co/jquery/s2t/0.1.0/s2t.min.js", function(data, status, jqxhr) {
                    $(document.body).s2t();//$.s2t(data);
                });
            }
        },
        't2s':function(){
            if(feifei.browser.language=='zh-cn'){
                $.getScript("http://cdn.feifeicms.co/jquery/s2t/0.1.0/s2t.min.js", function(data, status, jqxhr) {
                    $(document.body).t2s();//$.s2t(data);
                });
            }
        }
    },
    'page': {//鍒嗛〉
        'more': function(){
            $('body').on('click', '.ff-page-more', function(){
                $this = $(this);
                $page = $(this).attr('data-page')*1+1;
                $id = $this.attr('data-id');
                $.get($(this).attr('data-url')+$page, function(data){
                    if(data){
                        $("#"+$id).append(data);
                        $this.attr('data-page',$page);
                    }else{
                        $("#ff-page-more").hide();
                        $(this).unbind("click");
                    }
                },'html');
            });
        },
        'keydown': function(){
          prev=$('#ff-prev').attr("href");
          next=$('#ff-next').attr("href");
          $("body").keydown(function(event){
              if(event.keyCode==37 && prev!=undefined) location=prev; 
              if(event.keyCode==39 && next!=undefined) location=next; 
          });
      }
    },
    'search': {//鎼滅储
        'submit': function(){
            $("#ff-search button").on("click", function(){
                $action = $(this).attr('data-action');
                if($action){
                    $("#ff-search").attr('action', $action);
                }
            });
            $("#ff-search").on("submit", function(){
                $action = $(this).attr('action');
                if(!$action){
                    $action = cms.root+'seacher.php';
                }
                $wd = $('#ff-search #ff-wd').val();
                if($wd){
                    location.href = $action.replace('FFWD',encodeURIComponent($wd));
                }else{
                    $("#ff-wd").focus();
                    $("#ff-wd").attr('data-toggle','tooltip').attr('data-placement','bottom').attr('title','璇疯緭鍏ュ叧閿瓧').tooltip('show');
                }
                return false;
            });
        },
        'keydown': function(){//鍥炶溅
            $("#ff-search input").keyup(function(event){
                if(event.keyCode == 13){
                    location.href = cms.root+'index.php?s=vod-search-wd-'+encodeURIComponent($('#ff-search #ff-wd').val())+'-p-1.html';
                }
            });
        },
        'autocomplete': function(){
            $.ajaxSetup({ 
                cache: true 
            });
            $.getScript("http://cdn.bootcss.com/jquery.devbridge-autocomplete/1.2.26/jquery.autocomplete.min.js", function(response, status) {
                $('#ff-wd').autocomplete({
                    serviceUrl : cms.root+'index.php?s=search-vod',
                    params: {'limit': 10},
                    paramName: 'wd',
                    maxHeight: 400,
                    transformResult: function(response) {
                        var obj = $.parseJSON(response);
                        return {
                            suggestions: $.map(obj.data, function(dataItem) {
                                    return { value: dataItem.vod_name, data: dataItem.vod_link };
                            })
                        };
                    },
                    onSelect: function (suggestion) {
                        location.href = suggestion.data;
                        //alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
                    }
                });
            });
        },
        'hot':function(){
            $("#ff-site-hot").load(cms.root+"index.php?s=ajax-site_hot");
        }
    },
    'image': {//鍥剧墖
        'lazyload': function(){//寤惰繜鍔犺浇
            $.ajaxSetup({
                cache: true
            });
            $.getScript("http://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js", function(response, status) {
                $("img.ff-img").lazyload({
                    placeholder : cms.root+"Public/images/no.jpg",
                    effect : "fadeIn",
                    failurelimit: 15
                    //threshold : 400
                    //skip_invisible : false
                    //container: $(".carousel-inner"),
                }); 
            });
        },
        'qrcode': function(){//鐢熸垚浜岀淮鐮�
            //$("[data-toggle='popover']").popover({html: true});
            $(".glyphicon-phone").popover({
                    html: true
            });
            $(".glyphicon-phone").on('show.bs.popover', function () {
                $(".glyphicon-phone").attr('data-content','<img src="http://cdn.feifeicms.co/qrcode/1.0/?w=150&h=150&url='+encodeURIComponent(feifei.browser.url)+'"/>');
            })
        },
        'vcode':function(){//瀹夊叏鐮�
            return '<label><img class="ff-vcode-img" src="'+cms.root+'index.php?s=Vcode-Index"></label>';
        },
        'slide':function(){
            $('#ff-slide').carousel({interval: $('#ff-slide').attr('data-interval')});
        }
    },
    'vcode': {//楠岃瘉鐮�
        'load': function(){
            feifei.vcode.focus();
            feifei.vcode.click();
        },
        'focus': function(){//楠岃瘉鐮佹鐒︾偣
            $('body').on("focus", ".ff-vcode", function(){
                $(this).removeClass('ff-vcode').parent().after(feifei.image.vcode());
                $(this).unbind();
            });
        },
        'click': function(){//鐐瑰嚮鍒锋柊
            $('body').on('click', 'img.ff-vcode-img', function(){
                $(this).attr('src', cms.root+'index.php?s=Vcode-Index');
            });
        }
    },
    'updown': {//椤惰俯
        'click': function(){
            $('body').on('click', 'a.ff-updown', function(e){
                var $this = $(this);
                if($(this).attr("data-id")){
                    $.ajax({
                        url: cms.root+'index.php?s=updown-'+$(this).attr("data-module")+'-id-'+$(this).attr("data-id")+'-type-'+$(this).attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function(json){
                            $this.addClass('disabled');
                            if(json.status == 1){
                                if($this.attr("data-type")=='up'){
                                    $this.find('.ff-updown-tips').html(json.data.up);
                                }else{
                                    $this.find('.ff-updown-tips').html(json.data.down);
                                }
                            }else{
                                $this.attr('title', json.info);
                                $this.tooltip('show');
                            }
                        }
                    });
                }
            });
        }
    },
    'record': {//璁板綍
        'load': function(){
            feifei.record.get();
            feifei.record.set();
            feifei.record.btn();
        },
        'get':function(){//榧犳爣鐐瑰嚮灞曠ず瑙傜湅璁板綍
            if($(".ff-record-vod").attr('data-content') != undefined){
                $.get(cms.root+'index.php?g=home&m=record&a=vod&sid=1', function(data){
                    if(data == ''){
                        data = '鏆傛棤瑙傜湅璁板綍';
                    }
                    $(".ff-record-vod").attr('data-content',data);
                });
                $(".ff-record-vod").popover();
            }
        },
        'set':function(){//鑷姩鍐欏叆瑙傜湅鎴栨祻瑙堣褰�
            if($(".ff-record-set").attr('data-sid')){
                $.get(cms.root+'index.php?g=home&m=record&a=post&type=1&sid='+$(".ff-record-set").attr("data-sid")+'&did='+$(".ff-record-set").attr("data-id")+'&did_sid='+$(".ff-record-set").attr("data-id-sid")+'&did_pid='+$(".ff-record-set").attr("data-id-pid"));
            }
        },
        'btn':function(){//鎯崇湅 鍦ㄧ湅 鐪嬭繃 鐐瑰嚮鍐欏叆璁板綍
            $('body').on('click', 'a.ff-record', function(e){
                //鏄惁闇€瑕侀獙璇佺櫥褰�
                if(cms.userforum == 1 && cms.userid < 1){
                    feifei.user.login();
                    return false;
                }
                var $this = $(this);
                if($(this).attr("data-id")){
                    $.ajax({
                        url: cms.root+'index.php?g=home&m=record&a=post&sid='+$(this).attr("data-sid")+'&did='+$(this).attr("data-id")+'&type='+$(this).attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function(json){
                            if(json.status == 200){
                                $this.addClass('disabled');
                            }else{
                                $this.attr('title', json.info);
                                $this.tooltip('show');
                            }
                        }
                    });
                }
            });
        }
    },
    'star': {//璇勫垎
        'raty': function(){
            $.ajaxSetup({ 
                cache: true 
            });
            if($("#ff-raty").length ){
                $("<link>").attr({ rel: "stylesheet",type: "text/css",href: "http://cdn.bootcss.com/raty/2.7.1/jquery.raty.min.css"}).appendTo("head");
                $.getScript("http://cdn.bootcss.com/raty/2.7.1/jquery.raty.min.js", function(response, status) {
                    $('#ff-raty').raty({ 
                        starType: 'i',
                        number: 5,
                        numberMax : 5,
                        half: true,
                        score : function(){
                            return $(this).attr('data-score');
                        },
                        click: function(score, evt) {
                            $.ajax({
                                type: 'get',
                                url: cms.root+'index.php?s=gold-'+$('#ff-raty').attr('data-module')+'-id-'+$('#ff-raty').attr('data-id')+'-score-'+(score*2),
                                timeout: 5000,
                                dataType:'json',
                                error: function(){
                                    $('#ff-raty').attr('title', '缃戠粶寮傚父锛�').tooltip('show');
                                },
                                success: function(json){
                                    if(json.status == 1){
                                        $('#ff-raty-tips').html(json.data.gold);
                                    }else{
                                        $('#ff-raty').attr('title', json.info).tooltip('show');
                                    }
                                }
                            });
                        }
                    });
                });
            }
        }
    },
    'hits':{//浜烘皵
        'load': function(){
            $(".ff-hits").each(function(i){
                $this = $(".ff-hits").eq(i);
                $.ajax({
                    url: cms.root+'index.php?s=hits-show-id-'+$this.attr("data-id")+'-sid-'+$this.attr("data-sid")+'-type-'+$this.attr("data-type"),
                    cache: true,
                    dataType: 'json',
                    success: function(json){
                        $type = $(".ff-hits").eq(i).attr('data-type');
                        if($type != 'insert'){
                            $('#ff-hits-'+$type).html(eval('(json.' + $type + ')'));
                        }
                    }
                });
         });
        }
    },
    'share':{//鍒嗕韩
        'baidu': function(){
            if($("#ff-share").length ){
                $size = $("#ff-share").attr('data-size');
                if(!$size){$size = 16;}
                $("#ff-share").html('<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="鍒嗕韩鍒癚Q绌洪棿"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="鍒嗕韩鍒板井淇�"></a><a href="#" class="bds_sqq" data-cmd="sqq" title="鍒嗕韩鍒癚Q濂藉弸"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="鍒嗕韩鍒版柊娴井鍗�"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="鍒嗕韩鍒拌吘璁井鍗�"></a><a href="#" class="bds_bdysc" data-cmd="bdysc" title="鍒嗕韩鍒扮櫨搴︿簯鏀惰棌"></a><a href="#" class="bds_copy" data-cmd="copy" title="鍒嗕韩鍒板鍒剁綉鍧€"></a></div>');
                window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":""+$size+""},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
            }
        }
    },
    'scenario': {//鍒嗛泦鍓ф儏
        'load': function($max){
            $max = $("#vod-scenario-item").attr('data-max')*1;
            $count = $("#vod-scenario>dd").length;
            if($count > 0 && $max>0){
                var $list = '<li class="col-md-2 col-xs-4"><a href="javascript:;" data-startid="1" data-endid="'+$max+'" class="ff-text">绗�1-'+$max+'闆�</a></li>';
                for($i=1; $i<$count; $i++){
                    if(($i+$max) > $count){
                        $max_ji = $count;
                    }else{
                        $max_ji = $i+$max;
                    }
                    if($i % $max == 0){
                        $list+='<li class="col-md-2 col-xs-4"><a href="javascript:;" data-startid="'+($i+1)+'" data-endid="'+$max_ji+'">绗�'+($i+1)+'-'+$max_ji+'闆�</a></li>';
                    }
                }
                $('#vod-scenario-item').html($list);
                feifei.scenario.tabs(1,$max);
                feifei.scenario.click();
            }
        },
        'tabs': function($startid, $endid){
            $(".vod-scenario-title").hide();
            $(".vod-scenario-info").hide();
            for($i=$startid; $i<=$endid; $i++){
                $("#vod-scenario-title-"+$i).show();
                $("#vod-scenario-info-"+$i).show();
            }
        },	
        click: function(){
            $('#vod-scenario-item').on('click', 'a', function(e){
                $startid = $(this).attr('data-startid')*1;
                $endid = $(this).attr('data-endid')*1;
                feifei.scenario.tabs($startid, $endid);
                $('#vod-scenario-item a').removeClass('ff-text');
                $(this).addClass('ff-text');
            });
        }
    },
    'forum': {//璁ㄨ妯″潡鍔熻兘
        'load': function(){
            if($('.ff-forum-reload').html()){
                feifei.forum.reload();
            }else{
                feifei.forum.comment();
            }
            //鐧诲綍楠岃瘉
            $(".ff-forum").on("focus", 'textarea[name=forum_content]', function(){ //琛ㄥ崟鎻愪氦
                //鏄惁闇€瑕侀獙璇佺櫥褰�
                if(cms.userforum == 1 && cms.userid < 1){
                    feifei.user.login();
                }
            });
        },
        'reload': function(){//鍙戣〃鍚庡埛鏂扮綉椤� 鐣欒█鏈壒娈婄増鍧� sid=5
            feifei.forum.form();//鍥炲琛ㄥ崟妗�
            feifei.forum.report();//涓炬姤浜嬩欢
            $("body").on("submit", '.form-forum', function(){ //琛ㄥ崟鎻愪氦
                feifei.forum.submit($(this), 'guestbook', false);
                return false;
            });
        },		
        'comment': function(){//璇勮鍙戣〃鍚� 瀹瑰櫒AJAX鍔熻兘
            $cid = $("#ff-forum").attr('data-id');
            $sid = $("#ff-forum").attr('data-sid');
            if($cid && $sid){
                $.ajax({
                    type: 'get',
                    url: cms.root+'index.php?s=forum-config-sid-'+$sid+'-cid-'+$cid,
                    timeout: 3000,
                    dataType:'json',
                    error: function(){
                        $("#ff-forum").html('璇勮鍔犺浇澶辫触');
                    },
                    success:function(json){
                        if(json.data.forum_type == 'uyan'){
                            feifei.forum.uyan(json.data.uyan_uid);
                        }else if(json.data.forum_type == 'changyan'){
                            feifei.forum.changyan($sid+'-'+$cid, json.data.changyan_appid, json.data.changyan_appconf);
                        }else{
                            feifei.forum.show($cid, $sid, 'ajax_'+json.data.forum_module, 1);//ajax鍔犺浇
                            feifei.forum.form();//鍥炲琛ㄥ崟妗�
                            feifei.forum.report();//涓炬姤浜嬩欢
                            $("body").on("submit", '.form-forum', function(){
                                feifei.forum.submit($(this), 'ajax_'+json.data.forum_module, 3000);
                                return false;
                            });
                        }
                    }
                });
            }
        },
        'show': function($cid, $sid, $module, $page){//AJAX鍔犺浇绯荤粺璇勮
            $.ajax({
                type: 'get',
                url: cms.root+'index.php?s=forum-'+$module+'-sid-'+$sid+'-cid-'+$cid+'-p-'+$page,
                timeout: 3000,
                error: function(){
                    $("#ff-forum").html('璇勮鍔犺浇澶辫触锛岃鍒锋柊...');
                },
                success:function($html){
                    $("#ff-forum").html($html);
                }
            });
        },
        'report':function(){//涓炬姤
            $('body').on('mouseenter', '#ff-forum-item .forum-title', function(){
                $(this).find('.ff-report').fadeIn();
            });
            $('body').on('mouseleave', '#ff-forum-item .forum-title', function(){
                $(this).find('.ff-report').fadeOut();
            });
            $('body').on('click', 'a.ff-report', function(){
                var $id = $(this).attr("data-id");
                if($id){
                    $.ajax({
                        type: 'get',
                        url: cms.root+'index.php?s=forum-report-id-'+$id,
                        timeout: 3000,
                        dataType:'json',
                        success:function(json){
                            feifei.alert.success($('.form-forum').eq(0).find('.ff-alert'), json.info);
                        }
                    });
                }
            });
        },
        'reply': function($id){//鏇存柊鍥炲鏁板強鏄剧ず鍥炲閾炬帴
            $.ajax({
                type: 'get',
                url: cms.root+'index.php?s=forum-reply-id-'+$id,
                timeout: 3000,
                dataType:'json',
                success:function(json){
                    if(json.status==200){
                        $('#ff-reply-'+$id).find('.ff-reply-tips').html(json.data);//鏇存柊鍥炲鏁�
                        $('#ff-reply-'+$id).parent().find('.ff-reply-read').fadeIn();//鏄剧ず鏌ョ湅鍥炲閾炬帴
                    }
                }
            });
        },
        'form' : function(){ //鍥炲琛ㄥ崟鍔犺浇
            $('body').on('click', 'a.ff-reply', function(){
                var $id = $(this).attr("data-id");
                if($id){
                    //$(this).removeClass('ff-vcode');
                    var $form = $($(".form-forum").eq(0).parent().html());
                    $form.find("input[name='forum_pid']").val($id);
                    $('#forum-reply-'+$id).html($form);
                }
            });
        },
        'submit': function($this, $module, $timeout){//鍙戝竷
            $.post($this.attr('action'), $this.serialize(), function(json){
                if(json.status >= 200){
                    feifei.alert.success($this.find('.ff-alert'), json.info);//鍙戝竷鎴愬姛鎻愮ず
                    //$this.find("button[type='submit']").addClass('disabled');//绂佹鍐嶆鎻愪氦
                    if(json.data.forum_pid){
                        //璇ヨ璁轰负鍥炲鏃朵笉闇€瑕佸叏灞€鍒锋柊鎴栭噸鍔犺浇
                        feifei.forum.reply(json.data.forum_pid);//鏇存柊鍥炲鏁板強鏄剧ず鍥炲閾炬帴鎸夐挳
                        setTimeout(function(){$('#forum-reply-'+json.data.forum_pid).fadeOut('slow')}, 2000);//绉婚櫎鍥炲琛ㄥ崟瀹瑰櫒
                    }else{
                        //涓嶉渶瑕佸鏍哥殑鎯呭喌鎵嶆洿鏂板垪琛ㄦ垨鍒锋柊 201涓洪渶瑕佸鏍�
                        if(json.status == 200){
                            if($timeout){
                                setTimeout(function(){feifei.forum.show(json.data.forum_cid, json.data.forum_sid, $module, 1)}, $timeout);
                            }else{
                                location.reload();//鍒锋柊缃戦〉
                            }
                        }
                    }
                }else{
                    feifei.alert.warning($this.find('.ff-alert'), json.info);
                }
             },'json');
        },
        'uyan': function($uid){
            $("#ff-forum").html('<div id="uyan_frame"></div>');
            $.getScript("http://v2.uyan.cc/code/uyan.js?uid="+$uid);
        },
        'changyan': function($sourceid, $appid, $conf){
            var width = window.innerWidth || document.documentElement.clientWidth;
            if (width < 768) { 
                $("#ff-forum").html('<div id="SOHUCS" sid="'+$sourceid+'"></div><script charset="utf-8" id="changyan_mobile_js" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id='+$appid+'&conf=prod_'+$conf+'"><\/script>');
            }else{
                $("#ff-forum").html('<div id="SOHUCS" sid="'+$sourceid+'"></div>');
                $.getScript("https://changyan.sohu.com/upload/changyan.js",function(){
                    window.changyan.api.config({
                        appid: $appid,
                        conf: 'prod_'+$conf
                    });
                });
            }
        }
    },
    'playurl': {//鎾斁鍦板潃
        'download': function(){
            if($(".ff-down-list").length){
                $.getScript("http://cdn.feifeicms.co/download/xunlei.js");
            }
            //3.4澧炲姞榧犳爣鐐瑰嚮鍘绘帀鏂囦欢鍚嶆爣棰�
            $(".vod-item-down input[type=text]").focus(function(){
                $(this).val($(this).parent().find('input[type=checkbox]').val());
            });
        },
        'tongji': function(){
            if($("#cms_player").length){
                $.getScript("http://cdn.feifeicms.co/tongji/3.3/");
            }
        },
        'dropdown':function(){
            //default
            if($('.ff-dropdown .name').html()){
                $('.ff-dropdown-content').hide();
                $($('.ff-dropdown .name').attr('data-tabid')).fadeIn("slow");
            }else{//璇︽儏椤�
                $('.ff-dropdown .name').html($('.ff-dropdown-menu a').eq(0).html());
                $('.ff-dropdown-content').hide();
                $('.ff-dropdown-content').eq(0).fadeIn("slow");
            }
            //click
            $('.ff-dropdown-menu').on('click', 'a', function(e){
                $('.ff-dropdown .name').html($(this).html());
                $('.ff-dropdown-content').hide();
                $($(this).attr('data-tabid')).fadeIn("slow");
            });
        },
        'tab':function(){//tab鏍囩鏁堟灉
            if( $('.ff-tab a').length){
                $active_tab = $('.ff-tab-content').attr('data-tabid');
                if($($active_tab).html()){//鎾斁椤礣AB楂樹寒
                    $('.ff-tab a[href="'+$active_tab+'"]').tab('show');
                }else{
                    $('.ff-tab a').eq(0).tab('show');
                }
            }else{
                if($('.ff-tab').length){
                    $('.ff-tab').remove();
                }
            }
        },
        'active':function(){
            $('.ff-tab-content a[data-id="'+$('.ff-tab-content').attr('data-active')+'"]').removeClass("btn-default").addClass("btn-success");
            $('.ff-dropdown-content a[data-id="'+$('.ff-dropdown .name').attr('data-active')+'"]').removeClass("btn-default").addClass("btn-success");
            $('.ff-item-playurl a[data-id="'+$('.ff-item-playurl').attr('data-active')+'"]').removeClass("btn-default").addClass("btn-success");
            $('.ff-item-yugao a[data-id="'+$('.ff-item-yugao').attr('data-active')+'"]').removeClass("btn-default").addClass("btn-success");
        },
        'more':function(){
            //...鏁堟灉
            $('.vod-item-play').each(function(i){
                $this = $(this);
                $config = $this.attr('data-more')*1;
                $max = $this.find('li a').size();
                if(($config+2) < $max && $config>0){
                    $max_css = $this.find('li').attr('class');
                    $max_html = '<li class="'+$max_css+'"><a class="btn btn-default btn-sm" href="#all">鍏ㄩ儴...</a></li>';
                    $this.find('li').each(function(n){
                        if(n+1 > $config){
                            $(this).hide();
                        }
                    });
                    $this.find('li').eq($config).after($max_html);
                    $this.find('li:last').show();
                }
             });
            //more鐐瑰嚮
            $('.vod-item-play').on('click', 'a', function(e){
                if($(this).attr('href') == '#all'){
                    $(this).parent().parent().find('li').show();
                    $(this).parent().remove();
                }
            });
        },
        //vip鎾斁鍣ㄥ洖璋�
        'vip_callback':function($vod_id, $vod_sid, $vod_pid, $status, $trysee, $tips){
            if($status != 200){
                if($trysee > 0){
                    window.setTimeout(function(){
                        $.get(cms.root+'index.php?s=vod-vip-action-trysee-id-'+$vod_id+'-sid-'+$vod_sid+'-pid-'+$vod_pid, function(html){
                            $('#cms_player').html(html).removeClass("embed-responsive-4by3").css({"height":"auto"});
                        },'html');
                    },1000*60*$trysee);
                }else{
                    $('#cms-player-vip .cms-player-box').html($tips);
                    $('#cms-player-vip .cms-player-iframe').hide();
                    $('#cms_player').removeClass("embed-responsive-4by3").css({"height":"auto"});
                    //鏀粯褰卞竵鎸夐挳
                    $('#cms_player').on("click",".vod-price",function(){
                        $(this).html('Loading...');
                        $.get(cms.root+'index.php?s=vod-vip-action-ispay-id-'+$vod_id+'-sid-'+$vod_sid+'-pid-'+$vod_pid, function(json){
                            if(json.status == 200){
                                location.reload();
                            }else if(json.status == 500 || json.status == 501){
                                feifei.user.login();
                            }else{
                                $('#cms-player-vip .cms-player-box').html(json.info);
                            }
                        },'json');
                    });
                }
            }else{
                //鎷ユ湁VIP瑙傜湅鏉冮檺
            }
        }
    },
    'user':{
        'load':function(){
            //闈欐€佹ā寮忚幏鍙栫敤鎴峰熀鏈俊鎭�
            feifei.user.islogin();
            //妯℃€佹鐧诲綍
            $("body").on("click",".user-login",function(){
                feifei.user.login();
            });
        },
        //闈欐€佹ā寮忓姞杞界敤鎴稩D
        'islogin':function(){
            if(cms.urlhtml == 1){
                $.ajax({
                    type: 'get',
                    url: cms.root+'index.php?s=user-info',
                    timeout: 3000,
                    dataType:'json',
                    success:function(json){
                        if(json.status==200){
                            cms.userid = json.data.user_id;
                            cms.username = json.data.user_name;
                            $('#ff-user').html('<a class="ff-text" href="'+$('#ff-user').attr('data-href')+'">'+cms.username+'</a>');
                        }
                    }
                });
            }
        },
        //妯℃€佹鐧诲綍
        'login':function(){
            $.ajax({
                type: 'get',
                url: cms.root+'index.php?s=user-ajax_login',
                timeout: 3000,
                success:function($html){
                    $("#ff-modal").html($html);
                    $('.ff-modal').modal('show');
                    $(".user-login-forum").on('submit',function(e){
                        $.ajax({
                            url: $(this).attr('action'),
                            type: 'POST',
                            dataType: 'json',
                            timeout: 3000,
                            data: $(this).serialize(),
                            beforeSend: function(xhr){
                                $('.user-login-alert').html('姝ｅ湪鐧诲綍...');
                            },
                            error : function(){
                                $('.user-login-alert').html('璇锋眰澶辫触锛岃鍒锋柊缃戦〉銆�');
                            },
                            success: function(json){
                                if(json.status == 200){
                                    location.reload();
                                }else{
                                    $('#user-submit').html('鐧诲綍');
                                    feifei.alert.warning('.user-login-alert',json.info);
                                }
                            },
                            complete: function(xhr){
                            }
                        });
                        return false;
                    });
                }
            });
        },
        //鐢ㄦ埛涓績
        'center':function(){
            //鐢ㄦ埛涓績缁垂VIP鏃堕暱
            $("body").on("click",".user-upvip",function(){
                feifei.user.upvip();
            });
            //鐢ㄦ埛涓績鍏呭€�
            $("body").on("click",".user-pay", function(){
                feifei.user.pay();
            });		
            //淇敼閭
            $("body").on("click",".user-change-email", function(){
                feifei.user.email();
            });
            //淇敼瀵嗙爜
            $("body").on("click",".user-change-pwd", function(){
                feifei.user.repwd();
            });
        },	
        //鍗囩骇VIP
        'upvip':function(){
            $.ajax({
                type: 'get',
                url: cms.root+'index.php?s=user-ajax_upvip',
                timeout: 3000,
                success:function($html){
                    $("#ff-modal").html($html);
                    $('.ff-modal').modal('show');
                    $(".user-upvip-form").on('submit',function(e){
                        $.ajax({
                            url: $(this).attr('action'),
                            type: 'POST',
                            dataType: 'json',
                            timeout: 3000,
                            data: $(this).serialize(),
                            beforeSend: function(xhr){
                                $('.user-upvip-alert').html('Loading...');
                            },
                            error : function(){
                                $('.user-upvip-alert').html('璇锋眰澶辫触锛岃鍒锋柊缃戦〉銆�');
                            },
                            success: function(json){
                                if(json.status == 200){
                                    feifei.alert.success('.user-upvip-alert', '鍗囩骇瀹屾垚锛岃阿璋㈡敮鎸併€�');
                                    setTimeout(function(){location.reload();}, 2000);
                                }else if(json.status == 404){
                                    feifei.alert.success('.user-upvip-alert', '璇峰厛鐧诲綍銆�');
                                    setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
                                }else if(json.status == 501){
                                    feifei.alert.warning('.user-upvip-alert', '褰卞竵涓嶈冻锛屽叡闇€瑕�'+json.info+'涓奖甯侊紝璇峰厛鍐插€硷紒');
                                    setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.pay();}, 2000);
                                }else{
                                    feifei.alert.warning('.user-upvip-alert', json.info);
                                }
                            },
                            complete: function(xhr){
                            }
                        });
                        return false;
                    });
                }
            });
        },
        //鐢ㄦ埛鍏呭€�
        'pay':function(){
            $.ajax({
                type: 'get',
                url: cms.root+'index.php?s=user-ajax_pay',
                timeout: 3000,
                success:function($html){
                    $("#ff-modal").html($html);
                    $('.ff-modal').modal('show');
                    $(".user-pay-form").on('submit',function(e){
                        if($(".user-pay-form input[name=score_ext]").val() < $(".user-pay-form").attr('data-small')){
                            feifei.alert.warning('.user-pay-alert', '姣忔鑷冲皯鍏呭€�<strong>'+$(".user-pay-form").attr('data-small')+'</strong>鍏�');
                            return false;
                        }
                        setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();}, 5000);
                    });
                }
            });
        },
        //淇敼閭
        'email':function(){
            $.ajax({
                type: 'get',
                url: cms.root+'index.php?s=user-ajax_email',
                timeout: 3000,
                success:function($html){
                    $("#ff-modal").html($html);
                    $('.ff-modal').modal('show');
                    $(".user-email-form").on('submit',function(e){
                        $.ajax({
                            url: $(this).attr('action'),
                            type: 'POST',
                            dataType: 'json',
                            timeout: 3000,
                            data: $(this).serialize(),
                            beforeSend: function(xhr){
                                $('.user-email-alert').html('Loading...');
                            },
                            error : function(){
                                $('.user-email-alert').html('璇锋眰澶辫触锛岃鍒锋柊缃戦〉銆�');
                            },
                            success: function(json){
                                if(json.status == 200){
                                    feifei.alert.success('.user-email-alert', '閭淇敼瀹屾垚銆�');
                                    setTimeout(function(){location.reload();}, 2000);
                                }else if(json.status == 404){
                                    feifei.alert.success('.user-email-alert', '璇峰厛鐧诲綍銆�');
                                    setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
                                }else{
                                    feifei.alert.warning('.user-email-alert', json.info);
                                }
                            },
                            complete: function(xhr){
                            }
                        });
                        return false;
                    });
                }
            });
        },
        //淇敼瀵嗙爜
        'repwd':function(){
            $.ajax({
                type: 'get',
                url: cms.root+'index.php?s=user-ajax_repwd',
                timeout: 3000,
                success:function($html){
                    $("#ff-modal").html($html);
                    $('.ff-modal').modal('show');
                    $(".user-repwd-form").on('submit',function(e){
                        $.ajax({
                            url: $(this).attr('action'),
                            type: 'POST',
                            dataType: 'json',
                            timeout: 3000,
                            data: $(this).serialize(),
                            beforeSend: function(xhr){
                                $('.user-repwd-alert').html('Loading...');
                            },
                            error : function(){
                                $('.user-repwd-alert').html('璇锋眰澶辫触锛岃鍒锋柊缃戦〉銆�');
                            },
                            success: function(json){
                                if(json.status == 200){
                                    feifei.alert.success('.user-repwd-alert', '瀵嗙爜淇敼瀹屾垚銆�');
                                    setTimeout(function(){location.reload();}, 2000);
                                }else if(json.status == 404){
                                    feifei.alert.success('.user-repwd-alert', '璇峰厛鐧诲綍銆�');
                                    setTimeout(function(){$(".ff-modal").modal('hide');$('.modal-backdrop').hide();feifei.user.login();}, 2000);
                                }else{
                                    feifei.alert.warning('.user-repwd-alert', json.info);
                                }
                            },
                            complete: function(xhr){
                            }
                        });
                        return false;
                    });
                }
            });
        }
    },
    'cms':{//璇︽儏灞曠ず
        'content': function(){//鎶樺彔鏁堟灉
            $('body').on('click', '#ff-content-more', function(){
                if($($(this).attr('data-target')).css('display')=='none'){
                    $(this).html('鏀惰捣');
                    $($(this).attr('data-target')).show();
                    $($(this).attr('data-target')+'-remrk').hide();
                }else{
                    $(this).html('璇︽儏');
                    $($(this).attr('data-target')).hide();
                    $($(this).attr('data-target')+'-remrk').show();
                }
            });
        },
        'nav': function($id){
            $id = $('[data-dir]').attr('data-dir');
            $($id).addClass("active");
        }
    },
    'scroll':{//婊氬姩鏉�
        'fixed' : function($id, $top, $width){// 鎮诞鍖哄煙
            var offset = $('#'+$id).offset();
            if(offset){
                if(!$top){
                    $top = 5;
                }
                if(!$width){
                    $width = $('#'+$id).width();
                }			
                $(window).bind('scroll', function(){
                    if($(this).scrollTop() > offset.top){
                        $('#'+$id).css({"position":"fixed","top":$top+"px","width":$width+"px"});
                    }else{
                        $(('#'+$id)).css({"position":"relative"});
                    }
                });		
            }
        }
    }
    //end
    };
    /*#ff-search #wd #ff-goback .ff-gallery .ff-raty .ff-img .ff-share .ff-safecode .ff-reply*/
    $(document).ready(function(){
        if(feifei.browser.useragent.mobile){
            feifei.mobile.jump();
            feifei.mobile.nav();
            feifei.mobile.goback();
            feifei.mobile.flickity(".ff-gallery",0);
        }
        feifei.user.load();
        feifei.cms.nav();
        feifei.cms.content();
        feifei.search.submit();
        feifei.search.keydown();
        feifei.search.autocomplete();
        feifei.search.hot();
        feifei.image.lazyload();
        feifei.image.slide();
        feifei.image.qrcode();
        feifei.playurl.tongji();
        feifei.playurl.tab();
        feifei.playurl.dropdown();
        feifei.playurl.active();
        feifei.playurl.more();
        feifei.playurl.download();
        feifei.page.more();
        feifei.page.keydown();
        feifei.updown.click();
        feifei.star.raty();
        feifei.scenario.load();
        feifei.forum.load();
        feifei.vcode.load();
        feifei.user.center();
        feifei.record.load();
        feifei.hits.load();
        feifei.share.baidu();
    });