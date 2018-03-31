/**
 * Created by wangwenjun on 2018/3/18.
 */
'use strict';
var html1='';
var html2='';
var html3='';
var html4='';
var htmlVideo='';
var htmlVideo1='';
var htmlVideo2='';
var htmlVideo3='';
var htmlVideo4='';
var dataList1=[];
var dataList2=[];
var dataList3=[];
var dataList4=[];
var dataList = [
    {camera_id: "0001", camera_name: "1楼楼梯口", place: "1",url:'rtsp://admin:12345678a@222.85.147.216:554/Streaming/Channels/1202?transportmode-unicast'},
    {camera_id: "0002", camera_name: "2楼楼梯口", place: "1",url:'rtsp://admin:12345678a@222.85.147.216:554/Streaming/Channels/1202?transportmode-unicast'},
    {camera_id: "0003", camera_name: "3楼楼梯口", place: "1",url:'rtsp://admin:12345678a@222.85.147.216:554/Streaming/Channels/1202?transportmode-unicast'},
    {camera_id: "0004", camera_name: "4楼楼梯口", place: "1",url:'rtsp://admin:12345678a@222.85.147.216:554/Streaming/Channels/1202?transportmode-unicast'},
    {camera_id: "0005", camera_name: "5楼楼梯口", place: "1",url:'rtsp://admin:12345678a@222.85.147.216:554/Streaming/Channels/1202?transportmode-unicast'}
    ];
var body1 = {place:1};
var body2 = {place:2};
var body3 = {place:3};
var body4 = {place:4};
function addHtmlVideo(html,obj,number) {
    console.log(obj[number].url);
    html = `<object type='application/x-vlc-plugin' id='vlc${obj[number].place}' width="100%" height="100%" events='True'
                pluginspage="http://www.videolan.org"
                codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">
                <param name='mrl' value='${obj[number].url}' />
                <param name='volume' value='50' />
                <param name='autoplay' value='true' />
                <param name='loop' value='false' />
                <param value="transparent" name="wmode">
                <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin" width="100%" height="100%"
                       pluginspage="http://www.videolan.org" allownetworking="internal" allowscriptaccess="always" quality="high"
                       src="${obj[number].url}">
            </object>
`;
    return html;
}
function addHtmlVideo1(html,obj) {
    html = `<object type='application/x-vlc-plugin' id='vlc${obj[0].place}' width="100%" height="100%" events='True'
                pluginspage="http://www.videolan.org"
                codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">
                <param name='mrl' value='${obj[0].url}' />
                <param name='volume' value='50' />
                <param name='autoplay' value='true' />
                <param name='loop' value='false' />
                <param value="transparent" name="wmode">
                <embed id='vlc1' wmode="transparent" type="application/x-vlc-plugin" width="100%" height="100%"
                       pluginspage="http://www.videolan.org" allownetworking="internal" allowscriptaccess="always" quality="high"
                       src="${obj[0].url}">
            </object>
`;
    return html;
}
function controlHtml(html,obj) {
    for (let i=0;i<obj.length;i++) {
        html+=`<a class="video-item" href="#" data-id="${i}">${obj[i].camera_name}</a>`;
    }
    return html;
}

// 视频控制
$(function () {
    // 1号监视控制
    $.ajax({
        url: "http://119.23.219.22/AnalysisPlatform/query-camera-place",
        type: 'POST',
        dateType: 'json',
        data:body1,
        success: function(data){
            dataList1=data.values;
            console.log(dataList1);
            $('#controlVideo1Btn').text(dataList1[0].camera_name);
            htmlVideo = addHtmlVideo1(htmlVideo,dataList1);
            $('#video1').html(htmlVideo);
            html1=controlHtml(html1,dataList1);
            $('#controlVideo1').html(html1);
            $('#controlVideo1').on('click','a',function (event) {
                $('#controlVideo1Btn').text(event.target.innerText);
                htmlVideo1='';
                let IdVideo1=parseInt($(this).data('id'));
                // console.log(IdVideo1);
                htmlVideo1=addHtmlVideo(htmlVideo1,dataList1,IdVideo1);
                console.log(htmlVideo1);
                $('#video1').html(htmlVideo1);
            })
        }
    });
    // 2号监视控制
    $.ajax({
        url: "http://119.23.219.22/AnalysisPlatform/query-camera-place",
        type: 'POST',
        dateType: 'json',
        data:body2,
        success: function(data){
            dataList2=data.values;
            // console.log(dataList2);
            $('#controlVideo2Btn').text(dataList2[0].camera_name);
            htmlVideo = addHtmlVideo1(htmlVideo,dataList2);
            $('#video2').html(htmlVideo);
            html2=controlHtml(html2,dataList2);
            $('#controlVideo2').html(html2);
            $('#controlVideo2').on('click','a',function (event) {
                $('#controlVideo2Btn').text(event.target.innerText);
                htmlVideo2='';
                let IdVideo2=parseInt($(this).data('id'));
                // console.log(IdVideo2);
                htmlVideo2=addHtmlVideo(htmlVideo1,dataList2,IdVideo2);
                $('#video2').html(htmlVideo2);
            })
        }
    });
    // 3号监视控制
    $.ajax({
        url: "http://119.23.219.22/AnalysisPlatform/query-camera-place",
        type: 'POST',
        dateType: 'json',
        data:body3,
        success: function(data){
            dataList3=data.values;
            $('#controlVideo3Btn').text(dataList3[0].camera_name);
            htmlVideo3 = addHtmlVideo1(htmlVideo3,dataList3);
            $('#video3').html(htmlVideo3);
            html3=controlHtml(html3,dataList3);
            $('#controlVideo3').html(html3);
            $('#controlVideo3').on('click','a',function (event) {
                $('#controlVideo3Btn').text(event.target.innerText);
                htmlVideo3='';
                let IdVideo3=parseInt($(this).data('id'));
                htmlVideo3=addHtmlVideo(htmlVideo3,dataList3,IdVideo3);
                $('#video3').html(htmlVideo3);
            })
        }
    });
    // 4号监视控制
    $.ajax({
        url: "http://119.23.219.22/AnalysisPlatform/query-camera-place",
        type: 'POST',
        dateType: 'json',
        data:body4,
        success: function(data){
            dataList4=data.values;
            // console.log(dataList4);
            $('#controlVideo4Btn').text(dataList4[0].camera_name);
            htmlVideo4 = addHtmlVideo1(dataList4,dataList4);
            $('#video4').html(htmlVideo4);
            html4=controlHtml(html4,dataList4);
            $('#controlVideo4').html(html4);
            $('#controlVideo4').on('click','a',function (event) {
                $('#controlVideo4Btn').text(event.target.innerText);
                htmlVideo4='';
                let IdVideo4=parseInt($(this).data('id'));
                htmlVideo4=addHtmlVideo(htmlVideo4,dataList4,IdVideo4);
                $('#video4').html(htmlVideo4);
            })
        }
    });
});

$(function () {
    $('.vide-control-list').on('click','h6',function () {
        $('.vide-control-list .dropdown').addClass('hidden');
        $(this).next().removeClass('hidden');
    })
});


/*
<object type='application/x-vlc-plugin'  id='vlc${obj[0].place}' width="100%" height="100%" events='True'>
    <param name='mrl' value='${obj[0].url}' />
    <param name='volume' value='50' />
    <param name='autoplay' value='true' />
    <param name='loop' value='false' />
    <param name='fullscreen' value='true' />
    <param value="transparent" name="wmode">
</object>
*/

/*

<object type='application/x-vlc-plugin' id='vlc4' width="100%" height="100%" events='True'
pluginspage="http://www.videolan.org"
codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">
    <param name='mrl' value='rtsp://admin:12345678a@222.85.147.216:555/Streaming/Channels/102?transportmode-unicast' />
    <param name='volume' value='50' />
    <param name='autoplay' value='true' />
    <param name='loop' value='false' />
    <param value="transparent" name="wmode">
    <embed id='vlc' wmode="transparent" type="application/x-vlc-plugin" width="100%" height="100%"
pluginspage="http://www.videolan.org" allownetworking="internal" allowscriptaccess="always" quality="high"
src="rtsp://admin:12345678a@222.85.147.216:555/Streaming/Channels/102?transportmode-unicast">
    </object>
*/
