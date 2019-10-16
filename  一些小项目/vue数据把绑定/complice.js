function Compile(el, vm) {
    //vm是构造函数中的this
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null; // 代码片段
    this.init();//开始初始话渲染
}

Compile.prototype = {
    //开始初始话渲染
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);//创建代码片段
            //遍历代码片段中的所有子元素
            this.compileElement(this.fragment);
            
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    //创建Fragment片段
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    },
    //遍历代码片段中的所有子元素
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        //开始遍历
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            //是元素节点
            if (self.isElementNode(node)) {  
                self.compile(node);
            //处理元素中的文本节点
            } else if (self.isTextNode(node) && reg.test(text)) {
                
                self.compileText(node, reg.exec(text)[1]);
            }
            //递归遍历子元素中的元素
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },

    //处理元素节点
    compile: function(node) {
        var nodeAttrs = node.attributes;//获取所有属性
        var self = this;
        //遍历所有属性
        Array.prototype.forEach.call(nodeAttrs, function(attr) {
            var attrName = attr.name;//
            //是不是由v-开头
            if (self.isDirective(attrName)) {
                var exp = attr.value;//获取属性值
                var dir = attrName.substring(2);//获取指令类型
                 //判断是不是事件on：
                if (self.isEventDirective(dir)) {  
                    self.compileEvent(node, self.vm, exp, dir);
                //v-model 指令
                } else {  
                    self.compileModel(node, self.vm, exp, dir);
                }
                //删除属性*
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        //更新数据
        this.updateText(node, initText);
        //创建订阅者
        new Watcher(this.vm, exp, function (value) {
            
            self.updateText(node, value);
        });
    },
    //处理事件绑定
    compileEvent: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1];//获取事件类型
        //执行methods里的对应函数
        var cb = vm.methods && vm.methods[exp];
        //全包两者为真绑定
        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
    //处理  v-model  类型
    compileModel: function (node, vm, exp, dir) {
        var self = this;
        //获取data中的数据
        var val = this.vm[exp];
        //更新数据
        this.modelUpdater(node, val);
        //创建一个订阅者 
        new Watcher(this.vm, exp, function (value) {

            self.modelUpdater(node, value);
            
        });
        //绑定当页面内容改变时改变数据
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    //更新{{}}中的数据
    updateText: function (node, value) {
      
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    //更新数据
    modelUpdater: function(node, value, oldValue) {
        console.log('更新')
        node.value = typeof value == 'undefined' ? '' : value;
    },
    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function(dir) {
        return dir.indexOf('on:') === 0;
    },
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
}