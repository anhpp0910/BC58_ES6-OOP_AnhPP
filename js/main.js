import Student from "../model/Student.js";
import Employee from "../model/Employee.js";
import Customer from "../model/Customer.js";
import ListPerson from "../model/ListPerson.js";
import {
  renderAllUserTable,
  renderStudentTable,
  renderEmployeeTable,
  renderCustomerTable,
  clearFields,
  clearErrors,
} from "./controller.js";
import {
  ktLoaiUser,
  ktRequired,
  ktInputKiSo,
  ktExist,
  ktHoTen,
  ktEmail,
  ktDiem,
  ktSoNgayLam,
} from "./validate.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Khởi tạo personList từ lớp ListPerson
let personList = new ListPerson();

// Get data from Local Storage and render
let dataJson = localStorage.getItem("DSND_LOCAL");
if (dataJson != null) {
  personList.persons = JSON.parse(dataJson).persons;
  renderAllUserTable(personList.persons);
}

// Handle event change Lọc theo loại người dùng
$("#filterUser").onchange = () => {
  switch ($("#filterUser").value) {
    case "default":
      $(".table.display.active")?.classList.remove("active");
      $("table.display.allUserTable").classList.add("active");
      $("#sortByName").value = "default";
      renderAllUserTable(personList.persons);
      break;
    case "student":
      $(".table.display.active")?.classList.remove("active");
      $("table.display.studentTable").classList.add("active");
      $("#sortByName").value = "default";
      renderStudentTable(personList.persons);
      break;
    case "employee":
      $(".table.display.active")?.classList.remove("active");
      $("table.display.employeeTable").classList.add("active");
      $("#sortByName").value = "default";
      renderEmployeeTable(personList.persons);
      break;
    case "customer":
      $(".table.display.active")?.classList.remove("active");
      $("table.display.customerTable").classList.add("active");
      $("#sortByName").value = "default";
      renderCustomerTable(personList.persons);
      break;
  }
};

// Handle select Chọn người dùng ở model Thêm người dùng
$("#userType").onchange = () => {
  switch ($("#userType").value) {
    case "":
      $(".infoByUser.active")?.classList.remove("active");
      break;
    case "student":
      $(".infoByUser.active")?.classList.remove("active");
      $(".infoByUser.studenInfo").classList.add("active");
      break;
    case "employee":
      $(".infoByUser.active")?.classList.remove("active");
      $(".infoByUser.employeeInfo").classList.add("active");
      break;
    case "customer":
      $(".infoByUser.active")?.classList.remove("active");
      $(".infoByUser.customerInfo").classList.add("active");
      break;
  }
};

// Hàm get thông tin User từ modal và push vào personList
const getPersonInfo = () => {
  const elements = $$("#userForm input, #userForm select, #userForm textarea");
  let person = {};
  elements.forEach((element) => {
    const { name, value } = element;
    person[name] = value;
  });
  // Validation
  // Loại người dùng
  let isValid = ktLoaiUser($("#userType").value);
  // Mã
  isValid &=
    ktRequired($("#userId").value, "#tbUserId") &&
    ktInputKiSo($("#userId").value, "#tbUserId") &&
    ktExist($("#userId").value, personList.persons);
  // Họ tên
  isValid &=
    ktRequired($("#name").value, "#tbName") && ktHoTen($("#name").value);
  // Địa chỉ
  isValid &= ktRequired($("#address").value, "#tbAddress");
  // Email
  isValid &=
    ktRequired($("#email").value, "#tbEmail") && ktEmail($("#email").value);

  switch (person.loaiUser) {
    case "student":
      // Điểm Toán
      isValid &=
        ktRequired($("#diemToan").value, "#tbDiemToan") &&
        ktDiem($("#diemToan").value, "#tbDiemToan");
      // Điểm Lý
      isValid &=
        ktRequired($("#diemLy").value, "#tbDiemLy") &&
        ktDiem($("#diemLy").value, "#tbDiemLy");
      // Điểm Hoá
      isValid &=
        ktRequired($("#diemHoa").value, "#tbDiemHoa") &&
        ktDiem($("#diemHoa").value, "#tbDiemHoa");

      break;
    case "employee":
      // Số ngày làm việc
      isValid &=
        ktRequired($("#soNgayLam").value, "#tbSoNgayLam") &&
        ktSoNgayLam($("#soNgayLam").value);
      // Lương theo ngày
      isValid &=
        ktRequired($("#luongTheoNgay").value, "#tbLuongTheoNgay") &&
        ktInputKiSo($("#luongTheoNgay").value, "#tbLuongTheoNgay");

      break;
    case "customer":
      // Tên công ty
      isValid &= ktRequired($("#tenCty").value, "#tbTenCty");
      // Trị giá hoá đơn
      isValid &=
        ktRequired($("#triGiaHoaDon").value, "#tbTriGiaHoaDon") &&
        ktInputKiSo($("#triGiaHoaDon").value, "#tbTriGiaHoaDon");
      // Đánh giá
      isValid &= ktRequired($("#danhGia").value, "#tbDanhGia");
      break;
  }

  if (isValid) {
    switch (person.loaiUser) {
      case "student":
        let student = new Student(
          person.ma,
          person.hoTen,
          person.diaChi,
          person.email,
          person.diemToan,
          person.diemLy,
          person.diemHoa
        );
        student.diemTB = Math.round(student.tinhDTB() * 10) / 10;
        personList.addPerson(student);
        break;
      case "employee":
        let employee = new Employee(
          person.ma,
          person.hoTen,
          person.diaChi,
          person.email,
          person.soNgayLam,
          person.luongTheoNgay
        );
        employee.tongLuong = employee.tinhLuong();
        personList.addPerson(employee);
        break;
      case "customer":
        let customer = new Customer(
          person.ma,
          person.hoTen,
          person.diaChi,
          person.email,
          person.tenCty,
          person.triGiaHoaDon,
          person.danhGia
        );
        personList.addPerson(customer);
        break;
    }
    console.log(personList);
    $("#btnClose").click();
  }
};

// Thêm người dùng
window.addPerson = () => {
  getPersonInfo();
  // Save DSND to LocalStorage
  localStorage.setItem("DSND_LOCAL", JSON.stringify(personList));
  // Render all user table
  $(".table.display.active")?.classList.remove("active");
  $("table.display.allUserTable").classList.add("active");
  $("#sortByName").value = "default";
  $("#filterUser").value = "default";
  renderAllUserTable(personList.persons);
};

// Xoá người dùng
window.deletePerson = (ma) => {
  let viTri = personList.persons.findIndex((person) => person.ma === ma);
  personList.persons.splice(viTri, 1);
  // Save DSND to LocalStorage and render again
  localStorage.setItem("DSND_LOCAL", JSON.stringify(personList));
  switch ($("#filterUser").value) {
    case "default":
      renderAllUserTable(personList.persons);
      break;
    case "student":
      renderStudentTable(personList.persons);
      break;
    case "employee":
      renderEmployeeTable(personList.persons);
      break;
    case "customer":
      renderCustomerTable(personList.persons);
      break;
  }
};

// Sửa người dùng
window.editPerson = (ma) => {
  $("#btnAdd").disabled = true;
  $("#btnUpdate").disabled = false;
  let viTri = personList.persons.findIndex((person) => person.ma === ma);
  let targetND = personList.persons[viTri];
  switch (targetND.loaiUser) {
    case "Sinh viên":
      $(".infoByUser.active")?.classList.remove("active");
      $(".infoByUser.studenInfo").classList.add("active");
      $("#userType").disabled = true;
      $("#userType").value = "student";
      $("#userId").readOnly = true;
      $("#userId").value = targetND.ma;
      $("#name").value = targetND.hoTen;
      $("#address").value = targetND.diaChi;
      $("#email").value = targetND.email;
      $("#diemToan").value = targetND.diemToan;
      $("#diemLy").value = targetND.diemLy;
      $("#diemHoa").value = targetND.diemHoa;
      break;

    case "Nhân viên":
      $(".infoByUser.active")?.classList.remove("active");
      $(".infoByUser.employeeInfo").classList.add("active");
      $("#userType").disabled = true;
      $("#userType").value = "employee";
      $("#userId").readOnly = true;
      $("#userId").value = targetND.ma;
      $("#name").value = targetND.hoTen;
      $("#address").value = targetND.diaChi;
      $("#email").value = targetND.email;
      $("#soNgayLam").value = targetND.soNgayLam;
      $("#luongTheoNgay").value = targetND.luongTheoNgay;
      break;

    case "Khách hàng":
      $(".infoByUser.active")?.classList.remove("active");
      $(".infoByUser.customerInfo").classList.add("active");
      $("#userType").disabled = true;
      $("#userType").value = "customer";
      $("#userId").readOnly = true;
      $("#userId").value = targetND.ma;
      $("#name").value = targetND.hoTen;
      $("#address").value = targetND.diaChi;
      $("#email").value = targetND.email;
      $("#tenCty").value = targetND.tenCty;
      $("#triGiaHoaDon").value = targetND.triGiaHoaDon;
      $("#danhGia").value = targetND.danhGia;
      break;
  }
};

// Cập nhật người dùng
window.updatePerson = () => {
  // tìm vị trí dựa vào mã => return viTri
  let ma = $("#userId").value;
  let viTri = personList.persons.findIndex((person) => person.ma === ma);
  let isValid = true;
  // validate và lấy thông tin user từ form
  switch (personList.persons[viTri].loaiUser) {
    case "Sinh viên":
      // Validation
      // Họ tên
      isValid &=
        ktRequired($("#name").value, "#tbName") && ktHoTen($("#name").value);
      // Địa chỉ
      isValid &= ktRequired($("#address").value, "#tbAddress");
      // Email
      isValid &=
        ktRequired($("#email").value, "#tbEmail") && ktEmail($("#email").value);
      // Điểm Toán
      isValid &=
        ktRequired($("#diemToan").value, "#tbDiemToan") &&
        ktDiem($("#diemToan").value, "#tbDiemToan");
      // Điểm Lý
      isValid &=
        ktRequired($("#diemLy").value, "#tbDiemLy") &&
        ktDiem($("#diemLy").value, "#tbDiemLy");
      // Điểm Hoá
      isValid &=
        ktRequired($("#diemHoa").value, "#tbDiemHoa") &&
        ktDiem($("#diemHoa").value, "#tbDiemHoa");
      break;

    case "Nhân viên":
      // Validation
      // Họ tên
      isValid &=
        ktRequired($("#name").value, "#tbName") && ktHoTen($("#name").value);
      // Địa chỉ
      isValid &= ktRequired($("#address").value, "#tbAddress");
      // Email
      isValid &=
        ktRequired($("#email").value, "#tbEmail") && ktEmail($("#email").value);
      // Số ngày làm việc
      isValid &=
        ktRequired($("#soNgayLam").value, "#tbSoNgayLam") &&
        ktSoNgayLam($("#soNgayLam").value);
      // Lương theo ngày
      isValid &=
        ktRequired($("#luongTheoNgay").value, "#tbLuongTheoNgay") &&
        ktInputKiSo($("#luongTheoNgay").value, "#tbLuongTheoNgay");
      break;

    case "Khách hàng":
      // Validation
      // Họ tên
      isValid &=
        ktRequired($("#name").value, "#tbName") && ktHoTen($("#name").value);
      // Địa chỉ
      isValid &= ktRequired($("#address").value, "#tbAddress");
      // Email
      isValid &=
        ktRequired($("#email").value, "#tbEmail") && ktEmail($("#email").value);
      // Tên công ty
      isValid &= ktRequired($("#tenCty").value, "#tbTenCty");
      // Trị giá hoá đơn
      isValid &=
        ktRequired($("#triGiaHoaDon").value, "#tbTriGiaHoaDon") &&
        ktInputKiSo($("#triGiaHoaDon").value, "#tbTriGiaHoaDon");
      // Đánh giá
      isValid &= ktRequired($("#danhGia").value, "#tbDanhGia");
      break;
  }

  if (isValid) {
    switch (personList.persons[viTri].loaiUser) {
      case "Sinh viên":
        personList.persons[viTri].hoTen = $("#name").value;
        personList.persons[viTri].diaChi = $("#address").value;
        personList.persons[viTri].email = $("#email").value;
        personList.persons[viTri].diemToan = $("#diemToan").value;
        personList.persons[viTri].diemLy = $("#diemLy").value;
        personList.persons[viTri].diemHoa = $("#diemHoa").value;
        personList.persons[viTri].diemTB =
          Math.round(
            (($("#diemToan").value * 1 +
              $("#diemLy").value * 1 +
              $("#diemHoa").value * 1) /
              3) *
              10
          ) / 10;
        break;

      case "Nhân viên":
        personList.persons[viTri].hoTen = $("#name").value;
        personList.persons[viTri].diaChi = $("#address").value;
        personList.persons[viTri].email = $("#email").value;
        personList.persons[viTri].soNgayLam = $("#soNgayLam").value;
        personList.persons[viTri].luongTheoNgay = $("#luongTheoNgay").value;
        personList.persons[viTri].tongLuong =
          $("#luongTheoNgay").value *
          1 *
          ($("#soNgayLam").value * 1).toLocaleString();
        break;

      case "Khách hàng":
        personList.persons[viTri].hoTen = $("#name").value;
        personList.persons[viTri].diaChi = $("#address").value;
        personList.persons[viTri].email = $("#email").value;
        personList.persons[viTri].tenCty = $("#tenCty").value;
        personList.persons[viTri].triGiaHoaDon = $("#triGiaHoaDon").value;
        personList.persons[viTri].danhGia = $("#danhGia").value;
        break;
    }

    // Save DSND to LocalStorage and render again
    localStorage.setItem("DSND_LOCAL", JSON.stringify(personList));
    switch ($("#filterUser").value) {
      case "default":
        renderAllUserTable(personList.persons);
        break;
      case "student":
        renderStudentTable(personList.persons);
        break;
      case "employee":
        renderEmployeeTable(personList.persons);
        break;
      case "customer":
        renderCustomerTable(personList.persons);
        break;
    }
    $("#btnClose").click();
  }
};

// Sắp xếp theo thứ tự tên
$("#sortByName").onchange = () => {
  let sortValue = $("#sortByName").value;
  switch (sortValue) {
    case "sortName":
      let sortNameArr = [...personList.persons].sort((a, b) =>
        a.hoTen.split(" ").pop().localeCompare(b.hoTen.split(" ").pop())
      );
      switch ($("#filterUser").value) {
        case "default":
          renderAllUserTable(sortNameArr);
          break;
        case "student":
          renderStudentTable(sortNameArr);
          break;
        case "employee":
          renderEmployeeTable(sortNameArr);
          break;
        case "customer":
          renderCustomerTable(sortNameArr);
          break;
      }
      break;
    case "default":
      switch ($("#filterUser").value) {
        case "default":
          renderAllUserTable(personList.persons);
          break;
        case "student":
          renderStudentTable(personList.persons);
          break;
        case "employee":
          renderEmployeeTable(personList.persons);
          break;
        case "customer":
          renderCustomerTable(personList.persons);
          break;
      }
      break;
  }
};

// Xoá tất cả input, error tip, enable/disable field input, button khi nhấn Close modal
window.closeModal = () => {
  clearFields();
  clearErrors();
  $("#userType").disabled = false;
  $("#userId").readOnly = false;
  $("#btnAdd").disabled = false;
  $("#btnUpdate").disabled = true;
};
