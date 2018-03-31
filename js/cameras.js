// 获取摄像头列表
var html = ``;
var pageList=``;
var cameraDtw = ``;
var body = {page: 1, row: 5};
$.ajax({
    url: "http://119.23.219.22/AnalysisPlatform/see-camera",
    type: 'POST',
    dateType: 'json',
    data:body,
    success: function(data){
        console.log(data);
        cameraDtw = data.values;
        html = circulationDate(cameraDtw,html);
        pageList = circulaPageList(data.number,pageList);
        $('#tableTbody').html(html);
        $('#pagination').html(pageList);
    }
});
function circulationDate(obj,html) {
    for (let i =0;i<obj.length;i++){
       /* let status;
        if(obj[i].camera_switch === 'false') {
            status= false
        }else if(obj[i].camera_switch === 'true') {
            status= true
        }*/
        html+=`<tr>`+
            `<td>${obj[i].camera_id}</td>`+
            `<td>${obj[i].camera_name}</td>`+
            `<td>${obj[i].place}</td>`+
            `<td>
                   <button class="btn btn-info" style="margin-left: 20px" id="${obj[i].camera_id}2" data-id="${obj[i].camera_id}" data-i="${i}" data-toggle="modal" data-target="#modCameraModule">修改</button>
                   <button class="btn btn-danger" style="margin-left: 20px"  id="${obj[i].camera_id}">删除</button> 
            </td>`+
            `</tr>`
    }
    return html;
}
function circulaPageList(obj,html) {
    for (let i=1;i<=Math.ceil(obj/5);i++) {
        if(Math.ceil(obj/5)<=1) {
            html = ''
        }else {
            html+=` <li class="page-item"><a class="page-link" href="#" id="${i}">${i}</a></li>`;
        }
    }
    return html;
}
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

// 修改摄像头
$(function () {
    $("#tableTbody").on('click','.btn-info',function(event){
        let cameraDtwModId = $(this).data("id").toString();
        console.log(cameraDtwModId);
        // cameraDtwModI = $(this).data("i");
        // console.log(cameraDtwModI);
        let cameraDtwMod=$.grep(cameraDtw,function (obj, i) {
            return obj.camera_id === cameraDtwModId
        });
        console.log(cameraDtwMod);
        let cameraDtwModHtml=`<div class="form-group">
                            <label for="camera_idMod">新摄像头序号</label>
                            <input type="text" class="form-control"  name="camera_id" id="camera_idMod" value="${cameraDtwMod[0].camera_id}">
                        </div>
                        <div class="form-group">
                            <label for="camera_nameMod">修改摄像头名称</label>
                            <input type="text" class="form-control"  name="camera_name" id="camera_nameMod" value="${cameraDtwMod[0].camera_name}">
                        </div>
                        <div class="form-group">
                            <label for="placeMod">修改摄像头位置</label>
                            <input type="number" class="form-control"  id="placeMod" name="place" value="${cameraDtwMod[0].place}">
                        </div>
                         <div class="form-group">
                            <label for="camera_idModbefore">摄像头修改前序号</label>
                            <input type="text" class="form-control"  name="update_id" id="camera_idModbefore" value="${cameraDtwMod[0].camera_id}">
                        </div>
                        <div class="form-group">
                            <label for="urlMod">修改视频流地址</label>
                            <input type="text" class="form-control" id="urlMod" name="url" value="${cameraDtwMod[0].url}">
                        </div>
                       `;
        $('#modCFormMod').html(cameraDtwModHtml)
    });
    $('#ModCamera').on('click',function () {
        let modCamera = $("#modCFormMod").serializeJSON();
        // cameraDtw.insert(cameraDtwModI,modCamera);
        $.ajax({
            url: "http://119.23.219.22/AnalysisPlatform/update-camera",
            type: 'POST',
            dateType: 'json',
            data:modCamera,
            success: function(data){
                console.log(data);
              window.location.reload();
            }
        });
    })
});

// 删除摄像头
$(function () {
    $("#tableTbody").on('click','.btn-danger',function(event){
        let html = ``;
        console.log(event.target.id);
        cameraDtw = $.grep(cameraDtw,function (obj) {
            return obj.camera_id!==event.target.id;
        });
        let delId = {camera_id: event.target.id};
        $.ajax({
            url: "http://119.23.219.22/AnalysisPlatform/delete-camera",
            type: 'POST',
            dateType: 'json',
            data:delId,
            success: function(data){
                console.log(data);
            }
        });
        html = circulationDate(cameraDtw,html);
        $('#tableTbody').html(html);
    });
});

//新增摄像头
$(function () {
    $('#addCamera').on('click',function () {
        let html = ``;
        let addCamera = $("#addForm").serializeJSON();
      /*  $.each(addCamera,function (k,v) {
            if(k === 'camera_switch') {
                if( addCamera.camera_switch === '0') {
                    addCamera.camera_switch = false
                }else{
                    addCamera.camera_switch = true
                }
            }
        });*/
        $.grep(cameraDtw,function (n, i) {
            if( n.camera_id===addCamera.camera_id){
                window.alert("对不起，摄像头序号已存在，请重新输入")
            }
            return false;
        });
        $.ajax({
            url: "http://119.23.219.22/AnalysisPlatform/add-camera",
            type: 'POST',
            dateType: 'json',
            data:addCamera,
            success: function(data,textStatus){
                console.log(data);
            }
        });
        cameraDtw.push(addCamera);
        html = circulationDate(cameraDtw,html);
        $('#tableTbody').html(html);
    })
});

//分页符
$(function () {
    $('.pagination').on('click','li',function (event) {
        html = ``;
        let pageNumber = {page:parseInt(event.target.id),row:5};
        $('.pagination li').removeClass('active');
        $(this).addClass('active');
        $.ajax({
            url: "http://119.23.219.22/AnalysisPlatform/see-camera",
            type: 'POST',
            dateType: 'json',
            data:pageNumber,
            success: function(data){
                cameraDtw = data.values;
                html = circulationDate(cameraDtw,html);
                $('#tableTbody').html(html);
            }
        });
    });

});



