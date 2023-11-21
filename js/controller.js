const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Hiển thị danh sách all user lên table
export function renderAllUserTable(persons) {
  let htmls = "";
  persons.forEach((person) => {
    htmls += `
      <tr>
        <th>${person.ma}</th>
        <th>${person.loaiUser}</th>
        <th>${person.hoTen}</th>
        <th>${person.diaChi}</th>
        <th>${person.email}</th>
        <th><button class="btn btn-warning me-2" data-bs-toggle="modal"
        data-bs-target="#myModal" onclick="editPerson('${person.ma}')" data-toggle="modal" data-target="#exampleModal"
        >Edit</button>
        <button class="btn btn-danger" onclick="deletePerson('${person.ma}')">Delete</button>
        </th>
      </tr>
      `;
  });
  $("#tableAllUser").innerHTML = htmls;
}

// Hiển thị danh sách student lên table
export function renderStudentTable(persons) {
  let htmls = "";
  persons.forEach((person) => {
    if (person.loaiUser === "Sinh viên") {
      htmls += `
      <tr>
        <th>${person.ma}</th>
        <th>${person.hoTen}</th>
        <th>${person.diaChi}</th>
        <th>${person.email}</th>
        <th>${person.diemToan * 1}</th>
        <th>${person.diemLy * 1}</th>
        <th>${person.diemHoa * 1}</th>
        <th>${person.diemTB}</th>
        <th><button class="btn btn-warning me-2" data-bs-toggle="modal"
        data-bs-target="#myModal" onclick="editPerson('${
          person.ma
        }')" data-toggle="modal" data-target="#exampleModal"
        >Edit</button>
        <button class="btn btn-danger" onclick="deletePerson('${
          person.ma
        }')">Delete</button>
        </th>
      </tr>
      `;
    }
  });
  $("#tableStudent").innerHTML = htmls;
}

// Hiển thị danh sách employee lên table
export function renderEmployeeTable(persons) {
  let htmls = "";
  persons.forEach((person) => {
    if (person.loaiUser === "Nhân viên") {
      htmls += `
      <tr>
        <th>${person.ma}</th>
        <th>${person.hoTen}</th>
        <th>${person.diaChi}</th>
        <th>${person.email}</th>
        <th>${person.soNgayLam * 1}</th>
        <th>${(person.luongTheoNgay * 1).toLocaleString()}</th>
        <th>${person.tongLuong.toLocaleString()}</th>
        <th><button class="btn btn-warning me-2" data-bs-toggle="modal"
        data-bs-target="#myModal" onclick="editPerson('${
          person.ma
        }')" data-toggle="modal" data-target="#exampleModal"
        >Edit</button>
        <button class="btn btn-danger" onclick="deletePerson('${
          person.ma
        }')">Delete</button>
        </th>
      </tr>
      `;
    }
  });
  $("#tableEmployee").innerHTML = htmls;
}

// Hiển thị danh sách customer lên table
export function renderCustomerTable(persons) {
  let htmls = "";
  persons.forEach((person) => {
    if (person.loaiUser === "Khách hàng") {
      htmls += `
      <tr>
        <th>${person.ma}</th>
        <th>${person.hoTen}</th>
        <th>${person.diaChi}</th>
        <th>${person.email}</th>
        <th>${person.tenCty}</th>
        <th>${(person.triGiaHoaDon * 1).toLocaleString()}</th>
        <th>${person.danhGia}</th>
        <th><button class="btn btn-warning me-2" data-bs-toggle="modal"
        data-bs-target="#myModal" onclick="editPerson('${
          person.ma
        }')" data-toggle="modal" data-target="#exampleModal"
        >Edit</button>
        <button class="btn btn-danger" onclick="deletePerson('${
          person.ma
        }')">Delete</button>
        </th>
      </tr>
      `;
    }
  });
  $("#tableCustomer").innerHTML = htmls;
}

// Xoá tất cả value của field input
export function clearFields() {
  $("#userType").value = "";
  $(".infoByUser.active")?.classList.remove("active");
  $("#userId").value = "";
  $("#name").value = "";
  $("#address").value = "";
  $("#email").value = "";
  $("#diemToan").value = "";
  $("#diemLy").value = "";
  $("#diemHoa").value = "";
  $("#soNgayLam").value = "";
  $("#luongTheoNgay").value = "";
  $("#tenCty").value = "";
  $("#triGiaHoaDon").value = "";
  $("#danhGia").value = "";
}

// Xoá tất cả error tip của field input
export function clearErrors() {
  $("#tbUserType").style.display = "none";
  $("#tbUserType").innerHTML = "";
  $("#tbUserId").style.display = "none";
  $("#tbUserId").innerHTML = "";
  $("#tbName").style.display = "none";
  $("#tbName").innerHTML = "";
  $("#tbAddress").style.display = "none";
  $("#tbAddress").innerHTML = "";
  $("#tbEmail").style.display = "none";
  $("#tbEmail").innerHTML = "";
  $("#tbDiemToan").style.display = "none";
  $("#tbDiemToan").innerHTML = "";
  $("#tbDiemLy").style.display = "none";
  $("#tbDiemLy").innerHTML = "";
  $("#tbDiemHoa").style.display = "none";
  $("#tbDiemHoa").innerHTML = "";
  $("#tbSoNgayLam").style.display = "none";
  $("#tbSoNgayLam").innerHTML = "";
  $("#tbLuongTheoNgay").style.display = "none";
  $("#tbLuongTheoNgay").innerHTML = "";
  $("#tbTenCty").style.display = "none";
  $("#tbTenCty").innerHTML = "";
  $("#tbTriGiaHoaDon").style.display = "none";
  $("#tbTriGiaHoaDon").innerHTML = "";
  $("#tbDanhGia").style.display = "none";
  $("#tbDanhGia").innerHTML = "";
}
