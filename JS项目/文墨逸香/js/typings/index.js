 // 轮播图
 $("document").ready(() => {

     // 数据集
     let baseData = {};


     $.ajax({
         url: "http://localhost:9998/api/base/data",
         method: "get",
         async: false,
         success: function(data) {
             baseData.bannerList = data.data.banner;
             baseData.countList = data.data.count;
         },
         error: function(err) {
             console.log("请求失败" + err);
         }

     })


     const spinner = $(".spinner");

     // 创建轮播图
     for (let index = 0; index < baseData.bannerList.length; index++) {
         const obj = baseData.bannerList[index];

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

         spinnerItem.css("background-image", `url(${obj.imageUrl})`)

         spinner.append(spinnerItem);





     }


     const spinnerItems = spinner.children();
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



     /* 统计 */

     const countBox = $(".count-box");

     for (let index = 0; index < countBox.length; index++) {
         const element = countBox[index];
         // 统计标题
         $(element).children("p").text(baseData.countList[index].name);

         // 统计数量
         $(element).children(".counter").text(baseData.countList[index].number);


     }
     /* 文章 */
     $.ajax({
         url: "http://localhost:9998/api/article/list",
         method: "get",
         async: false,
         success: (data) => {
             console.log(data);

             for (let index = 0; index < data.data.length; index++) {
                 const element = data.data[index];
                 console.log(element);

                 /* 
                 <div class="container articleContent" data-aos="flip-up">

             
                     
                 </div>
                
                
                 */

                 let articleContent = $('<div class="container articleContent" data-aos="flip-up">');
                 let articleCover = $('<div class="article-cover">');
                 let articleCoverA = $('<a>');
                 let articleCoverImg = $('<img class="cover">');
                 let articleBrief = $('<div class="article-brief">');
                 let recentInfo = $('<div class="recent-info">');
                 let recentInfoTitle = $('<div class="title">');
                 let recentInfoTitleH3 = $('<h3 class="title">');
                 let recentInfoTitleH3A = $('<a>');
                 let recentInfoTitleInfo = $('<div class="info">');
                 let iconfont = $(' <i class="iconfont icon-riqi2">');
                 let span = $('<span class="base-info">');
                 let iconfont2 = $(' <i class="iconfont icon-grouping">');
                 let span2 = $('<span class="base-info">');
                 let content = $(' <div class="content">');


                 console.log(element);
                 $(articleCoverA).attr("href", "./readMain.html?aid=" + element.id);

                 $(articleCoverImg).attr("src", element.coverUrl);

                 console.log(articleCoverImg);
                 articleCoverA.append(articleCoverImg);
                 console.log(articleCoverA);
                 articleCover.append(articleCoverA);

                 recentInfoTitleH3A.text(element.name);

                 recentInfoTitleH3A.attr("href", "./readMain.html?aid=" + element.id)

                 recentInfoTitleH3.append(recentInfoTitleH3A)
                 recentInfoTitle.append(recentInfoTitleH3);

                 recentInfoTitleInfo.append(iconfont);
                 span.text("发布时间:" + element.createTime);
                 recentInfoTitleInfo.append(span);

                 if (element.category) {
                     recentInfoTitleInfo.append(iconfont2);

                     span2.text("分类:" + element.category);
                 }
                 recentInfoTitleInfo.append(span2);

                 recentInfoTitle.append(recentInfoTitleInfo);

                 recentInfo.append(recentInfoTitle);

                 content.text("123");
                 recentInfo.append(content);



                 articleBrief.append(recentInfo);

                 articleContent.append(articleCover);
                 articleContent.append(articleBrief);

                 $("#content-inner").append(articleContent);



             }

         },
         error: (err) => {
             console.log(err);
         }
     })




 });



 // aos动画
 AOS.init();