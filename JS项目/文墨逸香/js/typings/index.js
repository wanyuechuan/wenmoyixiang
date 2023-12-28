
 // aos动画
 AOS.init();
// 轮播图
 $("document").ready(() => {

     // 数据集
     let baseData = {};
     let BaseDataReGetTimer;

     function AjaxBannerAndCount() {
         $.ajax({
             url: "http://localhost:9998/api/base/data",
             method: "get",
             async: true,
             success: function(res) {
                 if (res.code === "200") {
                     baseData.bannerList = res.data.banner;
                     baseData.countList = res.data.count;
                     createBanner();
                     initCount();
                 }
             },
             error: function(err) {
                 if (!BaseDataReGetTimer) {
                     BaseDataReGetTimer = setInterval(() => {
                         // 每五秒请求banner数据
                         if (!(baseData.bannerList && baseData.countList)) {
                             AjaxBannerAndCount();
                         } else {
                             clearInterval(BaseDataReGetTimer);
                             BaseDataReGetTimer = null;
                             console.log("清除计时器");
                         }
                     }, 5000);
                 }
             }

         })
     }
     AjaxBannerAndCount();




     function createBanner() {
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
         console.log("spinnerItems", spinnerItems);
         const list = $(".choice");
         const leftbutton = $(".leftbutton");
         const rightbutton = $(".rightbutton");
         // 定时器秒数
         const seconds = 3000;

         let index = 0;





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
         let timer = setInterval(move, seconds);
         // 自动轮播

         function move() {
             rightbutton.click();
         }

         function select() {
             spinnerItems.eq(index).stop(true, true).fadeIn(500).siblings().stop(true, true).fadeOut(500);
             list.children().eq(index).addClass("c-active").siblings().removeClass("c-active")
         }

     }
     /* 统计 */

     function initCount() {

         const countBox = $(".count-box");

         for (let index = 0; index < countBox.length; index++) {
             const element = countBox[index];
             console.log("COunt---", element);
             // 统计标题
             $(element).children("p").text(baseData.countList[index].name);

             // 统计数量
             console.log("COunt---number",baseData.countList[index].number);
             $(element).children(".counter").text(baseData.countList[index].number);

         }

     }


     let ArticlesTimer;

     function AjaxArticles() {
         /* 文章 */
         $.ajax({
             url: "http://localhost:9998/api/article/list",
             method: "get",
             async: true,
             success: (res) => {
                 if (res.code === "200") {
                     initArticles(res);
                     clearInterval(ArticlesTimer);
                     BaseDataReGetTimer = null;
                     console.log("文章===清除计时器");
                 }
             },
             error: (err) => {
                 if (!ArticlesTimer) {
                     ArticlesTimer = setInterval(() => {
                         AjaxArticles();
                     }, 5000);
                 }

             }
         })
     }
     AjaxArticles();


     function initArticles(data) {
        console.log(data);
         for (let index = 0; index < data.data.length; index++) {
             const element = data.data[index];
             console.log(element);

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

                 span2.text("分类:" + element.category.name);
             }
             recentInfoTitleInfo.append(span2);

             recentInfoTitle.append(recentInfoTitleInfo);

             recentInfo.append(recentInfoTitle);

             content.html(marked(element.profile));
             recentInfo.append(content);



             articleBrief.append(recentInfo);

             articleContent.append(articleCover);
             articleContent.append(articleBrief);

             $("#content-inner").append(articleContent);



         }

     }


 });



