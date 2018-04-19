<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="warpper">
        <div class="search">
            <input type="text" placeholder="请输入要搜索的内容" id="searchIpu">
            <ul id="searchUl">
                <li class="active" id="All" sex="all">All</li>
                <li id="Male" sex="male">Male</li>
                <li id="Female" sex="female">Female</li>
            </ul>
        </div>
        <div class="searchList">
            <ul id="list">
            </ul>
        </div>
    </div>
<script>
    var person = [
    { name: '王子钰', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '张美', src: '2.jpg', sex: 'male', des: '漂亮的程序猿' },
    { name: '刘新良', src: '3.jpg', sex: 'female', des: '我妈是王美丽' },
    { name: '唐强', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '屈婧婧', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '柯捷', src: '6.jpg', sex: 'female', des: '我也喜欢游泳' },
    { name: '张宇', src: '7.jpg', sex: 'male', des: '我妈是王美丽' }
    ];
    //存改变的内容
    var state = {
        text :'',
        sex :'all'
    }
    //存改变的内容相应的函数引用。
    var objFilter = {
        text : filterText,
        sex : filterSex
    }
    var inp = document.getElementById('searchIpu');
    var ul = document.getElementById('list');
    var searchUl = document.getElementById('searchUl');
    //默认渲染函数
    function render(list){
        var str = ""
        list.forEach(function (ele, index){
          str +=   '<li>\
                    <img src="./img/'+ ele.src +'" alt="">\
                    <span class="name">'+ ele.name +'</span>\
                    <span class="des">'+ ele.des +'</span>\
                    </li>'
        }); 
        ul.innerHTML = str;
    }
    render(person);
    //ul的监听事件
    searchUl.addEventListener('click',function(e){
           if(e.target.tagName == 'LI'){ //利用事件冒泡检查是不是点了li
               state.sex = e.target.getAttribute('sex'); //得到每个li的sex属性的值
               document.getElementsByClassName('active')[0].className = '';//之前的li删除active
               e.target.className = 'active';//当前的li加样式。
            //    render(filterSex(sex,person));
               render(addFn(objFilter,person)); //交集渲染
           }
    })
    //组合筛选函数
    function addFn(objFn,arr){
     var lastArr = arr;
     for(var prop in objFn){ //遍历两个函数
         lastArr = objFn[prop](state[prop],lastArr);//每次都执行对象里面的函数
     }
     console.log(lastArr);
     return lastArr;
    }
    //筛选名
    function filterText(text,arr){ 
      return arr.filter(function(ele,index){
          if(ele.name.indexOf(text) !== -1){ //筛选名
              return true;
           }else if(ele.des.indexOf(text) !== -1){//能实现des模糊查询
              return true;
           }
       })
    }
    //性别筛选
    function filterSex(sex,arr){
        if(sex == 'all' ){
             return arr;
        }else{
            return arr.filter(function(ele,index){
                if(sex == ele.sex){
                    return true;
                }
            })
        }
    }
    //做防抖
    function debounce(handler,delay) {
           var timer = null;    //防抖延迟执行，利用setTimeout延时器。
           return function (e) {//oInp.oninput真正执行的函数。
            // state.text = this.value;
            var _self = this,   //this指向oInp。
                _arg = arguments;//系统会打包源对象传到实参来。
            clearTimeout(timer); //用户不停的输入删除操作，不超过一秒时。会无限制调用定时器里面的handler。
                                 //所以在用户不确定的时候，把之前的定时器都清除掉。
            timer = setTimeout(function(){//延迟执行handler。达到真正的防抖。
                handler.apply(_self,_arg);//由于有时候被返回的事件处理函数需要用到源对象。所以apply一下。
                                          //这样写相当于达到oInp.oninput = ajax的效果，并且把源对象传过去。
            },delay);
           }
        }

    inp.oninput = debounce(changeArr,1000); 
    function changeArr() {
        // console.log(this.value);
        state.text = this.value;
        render(addFn(objFilter,person)); 
        // render(filterText(text,person)); 
    }
</script>
</body>

</html>
