function apiRegister(data, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        data : data,
        url: api_url + 'api/register',
        success: successCallback,
        error : errorCallback
      });
}