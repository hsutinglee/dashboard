const uploadPatientForm = () => {

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
  fetch("http://140.123.173.244:8080/fhir/Patient", {
      method: 'POST',
      body: JSON.stringify(fhirData),
      headers: {
        'Content-Type': 'application/fhir+json;charset=utf-8'
      }
    })
    .then(res => {
      return res.json();
    }).then(response => {
      console.log(response);
    });
}
