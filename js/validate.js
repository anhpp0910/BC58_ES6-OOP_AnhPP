const $ = document.querySelector.bind(document);

export function ktLoaiUser(userTypeInputField) {
  if (userTypeInputField != "") {
    $("#tbUserType").style.display = "none";
    $("#tbUserType").innerHTML = "";
    return true;
  }
  $("#tbUserType").style.display = "block";
  $("#tbUserType").innerHTML = "Chọn loại người dùng!";
  return false;
}

export function ktRequired(inputField, spError) {
  if (inputField != "") {
    $(spError).style.display = "none";
    $(spError).innerHTML = "";
    return true;
  }
  $(spError).style.display = "block";
  $(spError).innerHTML = "Nhập thông tin!";
  return false;
}

export function ktInputKiSo(inputField, spError) {
  const re = /^\d+$/;
  if (re.test(inputField)) {
    $(spError).style.display = "none";
    $(spError).innerHTML = "";
    return true;
  }
  $(spError).style.display = "block";
  $(spError).innerHTML = "Chỉ được nhập số nguyên dương!";
  return false;
}

export function ktExist(userIdInputField, persons) {
  var viTri = persons.findIndex((person) => person.ma === userIdInputField);
  if (viTri === -1) {
    $("#tbUserId").style.display = "none";
    $("#tbUserId").innerHTML = "";
    return true;
  }
  $("#tbUserId").style.display = "block";
  $("#tbUserId").innerHTML = "Mã người dùng đã tồn tại!";
  return false;
}

export function ktHoTen(nameInputField) {
  const re =
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
  if (re.test(nameInputField)) {
    $("#tbName").style.display = "none";
    $("#tbName").innerHTML = "";
    return true;
  }
  $("#tbName").style.display = "block";
  $("#tbName").innerHTML = "Họ tên không hợp lệ!";
  return false;
}

export function ktEmail(emailInputField) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(emailInputField)) {
    $("#tbEmail").style.display = "none";
    $("#tbEmail").innerHTML = "";
    return true;
  }
  $("#tbEmail").style.display = "block";
  $("#tbEmail").innerHTML = "Email không hợp lệ!";
  return false;
}

export function ktDiem(diemInputField, spError) {
  if (diemInputField >= 0 && diemInputField <= 10) {
    $(spError).style.display = "none";
    $(spError).innerHTML = "";
    return true;
  }
  $(spError).style.display = "block";
  $(spError).innerHTML = "Nhập trên thang điểm 10!";
  return false;
}

export function ktSoNgayLam(soNgayLamInputField) {
  const re = /^\d+(\.\d+)*$/;
  if (re.test(soNgayLamInputField)) {
    $("#tbSoNgayLam").style.display = "none";
    $("#tbSoNgayLam").innerHTML = "";
    return true;
  }
  $("#tbSoNgayLam").style.display = "block";
  $("#tbSoNgayLam").innerHTML = "Số ngày làm không hợp lệ!";
  return false;
}
