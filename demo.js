var person = [
    { name: '王子钰', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '张美', src: '2.jpg', sex: 'male', des: '漂亮的程序猿' },
    { name: '刘新良', src: '3.jpg', sex: 'female', des: '我妈是王美丽' },
    { name: '唐强', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '屈婧婧', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '柯捷', src: '6.jpg', sex: 'female', des: '我也喜欢游泳' },
    { name: '张宇', src: '7.jpg', sex: 'male', des: '我妈是王美丽' }
    ];
    var inp = document.getElementById('searchIpu');
    var ul = document.getElementById('list');
    var allLi = document.getElementById('All');
    var maleLi = document.getElementById('Male');
    var femaleLi = document.getElementById('Female');
    //加载函数
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
    //inp.oninput
    inp.oninput = function () {
        console.log(this.value);
        var text = this.value;
        if(key==0){
            render(filterText(text,person));
        }else if(key == 1){
            render(filterAnd(text,newArr));
        }
        else{
            render(filterAnd(text,newArr));
        }
        
    }
    //all按钮
    var key = 0;
    var newArr = [];
    allLi.onclick = function(){
        key = 0;
        allLi.className = "active";
        maleLi.className = "" ;
        femaleLi.className = "";  
        if(inp.value == ""){
           render(person);
        }else{
           render(filterAnd(inp.value,person));
        }
        return false;
    }
    //male按钮
    maleLi.onclick = function(){
       key = 1;
       allLi.className = "";
       maleLi.className = "active" ;
       femaleLi.className = "";  
       newArr = filterSex("male",person);
       if(inp.value == ""){
          render(filterSex("male",person)); 
        }else{
          render(filterAnd(inp.value,newArr));
        }
       return false;
    }
    //female按钮
    femaleLi.onclick = function () {
       key = 2;
       allLi.className = "";
       maleLi.className = "" ;
       femaleLi.className = "active";
       newArr = filterSex("female",person);
       if(inp.value == ""){
          render(filterSex("female",person));
        }else{
          render(filterAnd(inp.value,newArr));
        }
       return false;
    }
    //根基关键字筛选(name and des)
    function filterText(text,arr){ 
      return arr.filter(function(ele,index){
          if(ele.name.indexOf(text) !== -1){ //筛选名
              return true;
           }else if(ele.des.indexOf(text) !== -1){ 
             return true;
          }
       })
    }
    //
    function filterAnd(text,arr){ 
      return arr.filter(function(ele,index){
          if(ele.name.indexOf(text) !== -1){ //筛选名
              return true;
           }else if(ele.des.indexOf(text) !== -1){ 
            return true;
          }
       })
    }
    //
    function filterSex(text,arr){ 
      return arr.filter(function(ele,index){
          if(ele.sex == text){ //筛选性别
              return true;
          }
       })
    }
    // obj = {
    //     filterTextFn : filterText,
    //     filterSexFn : filterSex
    // }