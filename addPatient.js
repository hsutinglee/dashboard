const uploadPatientForm = () => {
  let content = $('#content');

  // 清除警告訊息
  $('.alert').remove();

  // 檢查資料
  if ($('#name').val() === '') {
    content.prepend(`
      <div class="alert alert-danger">請填寫姓名！</div>
      `);
  }

  if ($('#identifier').val() === '') {
    content.prepend(`
      <div class="alert alert-danger">請填寫身分證字號！</div>
      `);
  }

  if (!($('#gender-male:checked').val() || $('#gender-female:checked').val())) {
    content.prepend(`
      <div class="alert alert-danger">請勾選性別！</div>
      `);
  }

  if ($('#birthDate').val() === '') {
    content.prepend(`
      <div class="alert alert-danger">請選擇出生年月日！</div>
      `);
  }

  // 資料檢查完畢，開始寫入
  const fhirData = {
    resourceType: 'Patient',
    identifier: [{
      use: 'usual',
      type: {
        text: '身分證字號'
      },
      value: $('#identifier').val(),
      assigner: {
        display: '內政部'
      }
    }],
    active: true,
    name: [{
      text: $('#name').val()
    }],
    gender: ($('#gender-male:checked').val()) ? 'male' : 'female',
    birthDate: $('#birthDate').val(),
    address: [{
      use: 'home',
      text: $('#address').val() || ''
    }],
    telecom: [{
      use: 'home',
      system: 'phone',
      value: $('#telecom').val() || ''
    }]
  };

  // 送出至伺服器
  fetch(`${baseUrl}/Patient`, {
      method: 'POST',
      body: JSON.stringify(fhirData),
      headers: {
        'Content-Type': 'application/fhir+json;charset=utf-8'
      }
    })
    .then(res => res.json())
    .then(response => {
      content.empty();
      content.append(`
          <div class="col-md-12">
              <h4>請求資料</h4>
              <textarea class="form-control" rows="15">${JSON.stringify(fhirData, null, 4)}"></textarea>
              <h4>回應資料</h4>
              <textarea class="form-control" rows="15">${JSON.stringify(response, null, 4)}</textarea>
          </div>
      `);
    });
}