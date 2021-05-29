// const { axios } = require("./axios");
let weather =g('.weather')
let header =g('.header')
let weaValue = weather.innerHTML
if(weaValue ==='阴'){
  header.style.backgroundImage="url(./images/yin.jpg)"

}else if(weaValue ==='雾'){
header.style.backgroundImage="url(./images/wu.jpg)"
}else if(weaValue==='云'){
header.style.backgroundImage="url(./images/yun.jpg)"
}else if(weaValue==='雪'){
header.style.backgroundImage="url(./images/xue.jpg)"
}else {
header.style.backgroundImage="url(./images/qing.jpg)"
}





//风力和湿度交替出现
let windDirection =document.querySelector('.windDirection')
let wind =document.querySelector('.wind')
let humidity =document.querySelector('.humidity')
  let ps= wind.querySelectorAll('p')
  let num=0;
  setInterval(function(){
      num++;
      if(num%2==0){
          windDirection.classList.remove('show')
          humidity.classList.add('show')
      }else{
          windDirection.classList.add('show')
          humidity.classList.remove('show')
      }   
  },1500)


  
  //大风预警点击出现警示框
  let windowShow = document.querySelector('.windowShow')
 let btn_close =document.querySelector('.btn-close')
  let li_warning =document.querySelector('.li-warning')
  li_warning.addEventListener('click',()=>{
        windowShow.style.display ='block'
  })
  btn_close.addEventListener('click',()=>{
      windowShow.style.display ='none'
  })


  //点击取消按钮，返回首页
  let cancle = document.querySelector('.cancle');
  let addressChange= document.querySelector('.addressChange')
  let address= document.querySelector('.address')
let timer =null
function rise(){
  let value =0;
  timer=setInterval(function(){
        value -= 25;
    addressChange.style.top = value +'px'
    if(value === -1425){
        clearInterval(timer)
        return
    }
  },10)
}
  cancle.onclick=function(){
     rise()
  }
  address.onclick=function(){
    let value =-1425;
    timer =setInterval(function(){
      value += 25;
      addressChange.style.top = value +'px'
      if(value ===0){
          clearInterval(timer)
          return
      }
    },10)
  }







//引入ajax
function ajax (options) {
	// 默认值
	var defaults = {
		type: 'get',
		url: '',
		data: {},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: function () {},
		error: function () {}
	}
	// 使用用户传递的参数替换默认值参数
	Object.assign(defaults, options);
	// 创建ajax对象
	var xhr = new XMLHttpRequest();
	// 参数拼接变量
	var params = '';
	// 循环参数
	for (var attr in defaults.data) {
		// 参数拼接
		params += attr + '=' + defaults.data[attr] + '&';
		// 去掉参数中最后一个&
		params = params.substr(0, params.length-1)
	}
	// 如果请求方式为get
	if (defaults.type == 'get') {
		// 将参数拼接在url地址的后面
		defaults.url += '?' + params;
	}

	// 配置ajax请求
	xhr.open(defaults.type, defaults.url);
	// 如果请求方式为post
	if (defaults.type == 'post') {
		// 设置请求头
		xhr.setRequestHeader('Content-Type', defaults.header['Content-Type']);
		// 如果想服务器端传递的参数类型为json
		if (defaults.header['Content-Type'] == 'application/json') {
			// 将json对象转换为json字符串
			xhr.send(JSON.stringify(defaults.data))
		}else {
			// 发送请求
			xhr.send(params);
		}
	} else {
		xhr.send();
	}
	// 请求加载完成
	xhr.onload = function () {
		// 获取服务器端返回数据的类型
		var contentType = xhr.getResponseHeader('content-type');
		// 获取服务器端返回的响应数据
		var responseText = xhr.responseText;
		// 如果服务器端返回的数据是json数据类型
		if (contentType.includes('application/json')) {
			// 将json字符串转换为json对象
			responseText = JSON.parse(responseText);
		}
		// 如果请求成功
		if (xhr.status == 200) {
			// 调用成功回调函数, 并且将服务器端返回的结果传递给成功回调函数
			defaults.success(responseText, xhr);
		} else {
			// 调用失败回调函数并且将xhr对象传递给回调函数
			defaults.error(responseText, xhr);
		} 
	}
	// 当网络中断时
	xhr.onerror = function () {
		// 调用失败回调函数并且将xhr对象传递给回调函数
		defaults.error(xhr);
	}
}

//实况天气信息

//  let hotUl =document.querySelector('.hotUl')
// let hotLi =hotUl.querySelectorAll('li')
//  for(let i=0;i<hotLi.length;i++){
 
//    hotLi[i].onclick = function(){
//     let value =hotLi[i].innerHTML
//      ajax({
//        type:'get',
//        headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
     
//       url:'https://www.tianqiapi.com/free/week?appid=78486725&appsecret=PWrmD2T8 ',
//       data:{
//         // appid=78486725&appsecret=0x5G34tC
//         // appid:'78486725',
//         // appsecret:'0x5G34tC ',
//         city:'重庆'
        
//       },
//        success:function(data){
//          console.log(data);
//        },
//        error:function(err){
//          console.log(err);
//        }

//      })
//    }
//  }



function g(uname){
  return document.querySelector(uname)
}
let hotUl =document.querySelector('.hotUl')
  let hotLi =hotUl.querySelectorAll('li')
  // let address = document.querySelector('.address')
  let temp = g('.temp')

  let til = g('.til')

  //添加历史记录
  let historyRecord =g('.historyRecord')
let historyUl=g('.historyUl')

for(let i =0;i<hotLi.length;i++){
  
    hotLi[i].onclick=function(){
      //返回首页
      rise()
      //添加历史记录
      let li =document.createElement('li')
      li.innerHTML =hotLi[i].innerHTML
      historyUl.insertBefore(li, historyUl.children[0]);

      //渲染页面
      let value = hotLi[i].innerHTML
      axios({
          method:'get',
          "content-type": "application/json",
          url:'https://www.tianqiapi.com/free/day?appid=78486725&appsecret=PWrmD2T8',
          headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
          },
          //设置请求体
          params:{
              city:value
              // cityid:"101010400"

          }
      }).then((res)=>{
          // console.log(res);
          // console.log(res.data);
          address.innerHTML = res.data.city
          temp.innerHTML=res.data.tem
          weather.innerHTML = res.data.wea
          windDirection.innerHTML=res.data.win+res.data.win_speed
          til.innerHTML= res.data.air
          if(res.data.wea ==='阴'){
              header.style.backgroundImage="url(./images/yin.jpg)"

          }else if(res.data.wea ==='雾'){
            header.style.backgroundImage="url(./images/wu.jpg)"
          }else if(res.data.wea==='云'){
            header.style.backgroundImage="url(./images/yun.jpg)"
          }else if(res.data.wea==='雪'){
            header.style.backgroundImage="url(./images/xue.jpg)"
          }else {
            header.style.backgroundImage="url(./images/qing.jpg)"
          }
      })
    }
  }


  //折线图部分数据渲染，折线图数据尚未渲染
let day =g('.day')
let date =g('.date')
let situation =g('.situation')
let chartOl=g('.chartOl')
let chartLis = chartOl.querySelectorAll('li')
// console.log(chartLis[1].childNodes);
// console.log(chartLis[1].childNodes[1].childNodes[1]);
  window.onload =function(){
    axios({
      method:'get',
      url:'https://www.tianqiapi.com/free/week?appid=78486725&appsecret=PWrmD2T8',
      params:{
        city:'重庆'
        // cityid:"101010400"

    }
    }).then((res)=>{
      //大风预警提示
      // let winWarning =g('.li-warning')
      // let winspeed=res.data.data[1].win_speed.substr(1,1)
      // console.log(winspeed);
      // if(winspeed>=6){
      //  winWarning.style.display='block'
      // }else{
      //   winWarning.style.display='none'
      // }
      // console.log(res);
      // console.log(res.data.data);
      res.data.data.forEach((element,index)=>{
        // console.log(chartLis[index]);
        // console.log(element);
        chartLis[index].childNodes[1].childNodes[3].innerHTML=element.date.substr(5)
        chartLis[index].childNodes[1].childNodes[5].innerHTML=element.wea
        chartLis[index].childNodes[1].childNodes[7].src='./images/day/'+element.wea_img+'.png'
        chartLis[index].childNodes[3].childNodes[1].src='./images/night/'+element.wea_img+'.png'
        chartLis[index].childNodes[3].childNodes[3].innerHTML=element.wea
        chartLis[index].childNodes[3].childNodes[5].innerHTML=element.win
        chartLis[index].childNodes[3].childNodes[7].innerHTML=element.win_speed
      })
    })
  }


//删除历史记录
let history =g('.history')
let clear  =g('.clear')
clear.addEventListener('click',function(){
  for(let i =0;i<=historyUl.children.length+1;i++){
    historyUl.removeChild(historyUl.children[0])
  }
 rise()
})


//天气状况弹出框
let close =g('.close')
let condition = g('.condition')
close.addEventListener('click',function(){
  condition.style.display='none'
})
let level =g('.level')
let body = document.body
level.addEventListener('click',function(){
  condition.style.display='block'
  
})




//搜索框搜索
let search=g('.search')
search.onkeyup=function(e){
  const value =search.value
  if(e.keyCode !==13) return
  axios({
    method:'get',
    "content-type": "application/json",
    url:'https://www.tianqiapi.com/free/day?appid=78486725&appsecret=PWrmD2T8',
    headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
    },
    params:{
      city:value
    }
  }).then((res)=>{
    console.log(res);
    rise();
    address.innerHTML = res.data.city
    temp.innerHTML=res.data.tem
    weather.innerHTML = res.data.wea
    windDirection.innerHTML=res.data.win+res.data.win_speed
    til.innerHTML= res.data.air


    //中部折线图渲染
    //大风预警提示是否显示
    let winWarning =g('.li-warning')
    let winspeed=res.data.win_speed.substr(0,1)
    if(winspeed>=6){
     winWarning.style.display='block'
    }else{
      winWarning.style.display='none'
    }

    //主体背景控制
    if(res.data.wea ==='阴'){
        header.style.backgroundImage="url(./images/yin.jpg)"

    }else if(res.data.wea ==='雾'){
      header.style.backgroundImage="url(./images/wu.jpg)"
    }else if(res.data.wea==='云'){
      header.style.backgroundImage="url(./images/yun.jpg)"
    }else if(res.data.wea==='雪'){
      header.style.backgroundImage="url(./images/xue.jpg)"
    }else {
      header.style.backgroundImage="url(./images/qing.jpg)"
    }
  })

  axios({
    method:'get',
    url:'https://www.tianqiapi.com/free/week?appid=78486725&appsecret=PWrmD2T8',
    params:{
      city:value
      // cityid:"101010400"

  }
  }).then((res)=>{
    console.log(res);
    res.data.data.forEach((element,index)=>{
 
      chartLis[index].childNodes[1].childNodes[3].innerHTML=element.date.substr(5)
      chartLis[index].childNodes[1].childNodes[5].innerHTML=element.wea
      chartLis[index].childNodes[1].childNodes[7].src='./images/day/'+element.wea_img+'.png'
      chartLis[index].childNodes[3].childNodes[1].src='./images/night/'+element.wea_img+'.png'
      chartLis[index].childNodes[3].childNodes[3].innerHTML=element.wea
      chartLis[index].childNodes[3].childNodes[5].innerHTML=element.win
      chartLis[index].childNodes[3].childNodes[7].innerHTML=element.win_speed
    })
  })
   
}


//每小时天气信息
// let area = address.value
// window.onload=function(){
//   axios({
//     method:'get',
//     url:'https://geoapi.qweather.com/v2/city/lookup',
//     params:{
//       key:'123456789ABC',
//       location:北京
//     }
//   }).then((res)=>{
//     console.log(res);
//   })
// }


//底部提示框
let back =g('.back')
let cover =g('.cover')
let alertWin = g('.alertWin')
let three=alertWin.querySelector('h3')

let footp=alertWin.querySelector('p')
let footerlis =g('.footerUl').querySelectorAll('li')
footerlis[0].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='尾号限行'
  footp.innerHTML='今日限行尾号为不限行，临时号牌按号牌尾号数字限行，机动车车牌尾号为英文字母的按0号管理。'
  three.style.backgroundColor='rgb(164, 173, 224)';
  back.style.backgroundColor='rgb(164, 173, 224)';
}
footerlis[1].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='穿衣指数'
  footp.innerHTML='建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。'

  three.style.backgroundColor='rgb(225, 164, 196)';
  back.style.backgroundColor='rgb(225, 164, 196)';
}
footerlis[2].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='雨伞指数'
  footp.innerHTML='阴天，但降水概率很低，因此您在出门的时候无须带雨伞。'

  three.style.backgroundColor='rgb(193, 164, 224)';
  back.style.backgroundColor='rgb(193, 164, 224)';
}
footerlis[3].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='感冒指数'
  footp.innerHTML='各项气象条件适宜，无明显降温过程，发生感冒机率较低。'

  three.style.backgroundColor='rgb(223, 199, 156)';
  back.style.backgroundColor='rgb(223, 199, 156)';
}
footerlis[4].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='洗车指数'
  footp.innerHTML='适宜洗车，未来持续两天无雨天气较好，适合擦洗汽车，蓝天白云、风和日丽将伴您的车子连日洁净。'

  three.style.backgroundColor='rgb(181, 230, 168)';
  back.style.backgroundColor='rgb(181, 230, 168)';
}
footerlis[5].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='运动指数'
  footp.innerHTML='天气较好，赶快投身大自然参与户外运动，尽情感受运动的快乐吧。'

  three.style.backgroundColor='rgb(230, 217, 157)';
  back.style.backgroundColor='rgb(230, 217, 157)';
}
footerlis[6].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='防嗮指数'
  footp.innerHTML='属弱紫外辐射天气，长期在户外，建议涂擦SPF在8-12之间的防晒护肤品。'

  three.style.backgroundColor='rgb(219, 173, 160)';
  back.style.backgroundColor='rgb(219, 173, 160)';
}
footerlis[7].onclick=function(){
  alertWin.style.display='block'
     cover.style.display='block'
    three.innerHTML='钓鱼指数'
  footp.innerHTML='天气不好，有风，不适合垂钓。'

  three.style.backgroundColor='rgb(163, 223, 212)';
  back.style.backgroundColor='rgb(163, 223, 212)';
}






// for(let i=0;i<footerlis.length;i++){
//   footerlis[i].onclick=function(){
//     alertWin.style.display='block'
//     cover.style.display='block'
//   }
// }
back.addEventListener('click',function(){
    alertWin.style.display ='none'
    cover.style.display='none'
})