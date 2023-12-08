 // 轮播图
$("document").ready(() => {

     let bannerList = null;


     $.ajax({
         url: "http://localhost:9998/api/api/image/banner",
         method: "get",
         async: false,
         success: function(data) {
             console.log(data);
             bannerList = data.data;
             console.log(bannerList);
         },
         error: function(err) {
             console.log("请求失败" + err);
         }

     })


     const spinner = $(".spinner");


     for (let index = 0; index < bannerList.length; index++) {
         const obj = bannerList[index];

         console.log(obj);

         // 创建 spinner item
         let spinnerItem = $("<div class='spinner-item'></div>");

         if (index == 0) {
             spinnerItem.addClass("s-active");
         }

         // 创建content
         let content = $("<div class='content'></div>")
         let h2 = $(`<h2 class='animated fadeInDown'>${obj.title}</h2>`)
         let p = $(`<p class='animated fadeInUp'>${obj.subtitle}</p>`)
         let button = $("<button class='animated fadeInUp scrollto'>查看详情</button>")

         content.append(h2);
         content.append(p);
         content.append(button);
        
         spinnerItem.append(content);

         spinnerItem.css("background-image",`url(${obj.imageUrl})`)

         spinner.append(spinnerItem);



         console.log(spinnerItem);


     }






     const spinnerItems = spinner.children();
     console.log("@@",spinnerItems);
     const list = $(".choice");
     const leftbutton = $(".leftbutton");
     const rightbutton = $(".rightbutton");
     // 定时器秒数
     const seconds = 3000;

     let index = 0;
     let timer = setInterval(move, seconds);




     // 小圆点 和 进入停止定时器
     for (let i = 0; i < spinnerItems.length; i++) {


         let li = $("<li>");
         li.attr("index", i);
         li.click(function() {
             index = $(this).attr("index")
             select();
         });
         list.append(li);

     }
     // 默认第一个
     list.children().eq(0).addClass("c-active");



     $(".spinner,.container svg,.container .choice").on("mouseenter", function() {
        console.log(123);
         clearInterval(timer);
         timer = null;
     })
     $(".spinner,.container svg,.container .choice").on("mouseleave", function() {
         timer = setInterval(move, seconds);
     })


     function select() {
         spinnerItems.eq(index).stop(true, true).fadeIn(500).siblings().stop(true, true).fadeOut(500);
         list.children().eq(index).addClass("c-active").siblings().removeClass("c-active")
     }

     rightbutton.click(() => {
         index++;
         if (index == spinnerItems.length) {
             index = 0;
         }
         select();

     })
     leftbutton.click(() => {
         index--;
         if (index == -1) {
             index = spinnerItems.length - 1;
         }
         select();

     })


     // 自动轮播
     function move() {
         rightbutton.click();
     }






 })

 // aos动画
 AOS.init();