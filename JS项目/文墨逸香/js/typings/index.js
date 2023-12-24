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

                 let articleContent = $('<div class="container articleContent" data-aos="flip-up"></div>');
                 let articleCover = $('<div class="article-cover"></div>');
                 let articleCoverA = $('<a></a>');
                 let articleCoverImg = $('<img class="cover"></img>');
                 let articleBrief = $('<div class="article-brief"></div>');
                 let recentInfo = $('<div class="recent-info"></div>');
                 let recentInfoTitle = $('<div class="title"></div>');
                 let recentInfoTitleH3 = $('<h3 class="title"></h3>');
                 let recentInfoTitleH3A = $('<a></a>');
                 let recentInfoTitleInfo = $('<div class="info"></div>');
                 let iconfont = $(' <i class="iconfont icon-riqi2"></i>');
                 let span = $('<span class="base-info"></span>');
                 let iconfont2 = $(' <i class="iconfont icon-grouping"></i>');
                 let span2 = $('<span class="base-info"></span>');
                 let content = $(' <div class="content"></div>');



                 $(articleCoverA).attr("href",element.contentUrl);

                 $(articleCoverImg).attr("src",element.coverUrl);

                 console.log(articleCoverImg);
                 articleCoverA.append(articleCoverImg);
                 console.log(articleCoverA);
                 articleCover.append(articleCoverA);
                /* <div class="article-brief">
                    <div class="recent-info">
                        <div class="title">
                            <h3><a href="#">关于JVM实现原理及实现方法11111111111111111111111111111111111111111111111111111111111111111</a></h3>
                            <div class="info">
                                <i class="iconfont icon-riqi2"></i><span class="base-info"> 发布时间:2023年11月20日</span>
                                <i class="iconfont icon-grouping"></i> <span class="base-info">分类:java</span>
                            </div>
                        </div>
                        <div class="content">
                            VM是虚拟机,也是一种规范,他遵循着冯·诺依曼体系结构的设计原理。冯·诺依曼体系结构中,指出计算机处理的数据和指令都是二进制数,采用存储程序方式不加区分的存储在同一个存储器里,并且顺序执行,指令由操作码和地址码组成
                        </div>
                    </div>
                </div> */
                
                 recentInfoTitleH3A.text(element.name);
                 recentInfoTitleH3A.href = element.contentUrl;
                 recentInfoTitleH3.append(recentInfoTitleH3A)
                 recentInfoTitle.append(recentInfoTitleH3);

                 recentInfoTitleInfo.append(iconfont);
                 span.text("发布时间:" + element.createTime);
                 recentInfoTitleInfo.append(span);
                 recentInfoTitleInfo.append(iconfont2);
                 span2.text("分类:" + element.category);
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