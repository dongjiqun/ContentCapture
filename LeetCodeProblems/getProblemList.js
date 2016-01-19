/**
 * Created by 我是喵啊喵 on 2015/12/6.
 */
var request = require('request');
var jsdom = require("jsdom").jsdom;
var fs = require("fs");

request('https://leetcode.com/problemset/algorithms/',function(error, response, body){ //请求题目列表网页
    if(error){console.log(error);}
    if (!error && response.statusCode == 200) {
        var window = jsdom(body).defaultView;
        var $ = require('jquery')(window);
        var problemlist = $("#problemList tbody tr").each(function(){ //获取题目列表以及题目内容链接
            var num = $(this).children("td").eq(1).html();
            var name = $(this).children("td").eq(2).children("a").html();
            var temp = $(this).children("td").eq(2).children("a").attr("href");
            //fs.appendFileSync("./problemList.txt",temp+"\n");
            request("https://leetcode.com"+temp, function(error, response, body){ //请求题目内容网页
                if (!error && response.statusCode == 200) {
                    var window = jsdom(body).defaultView;
                    var $ = require('jquery')(window);
                    var content = $(".question-content").children("p").eq(1).html(); //解析题目内容
                    console.log(num+" "+name+"\n"+content+"\n\n");
                    fs.appendFileSync("./problemContent.txt",num+" "+name+"\n"+content+"\n\n"); //保存至文件
                }
            });
        });
    }
});


