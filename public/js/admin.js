const deleteProduct = (btn) => {
  const trackId = btn.parentNode.querySelector("[name=trackerId]").value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
  const productElement = btn.closest('table');

  fetch(`/admin/deleteTrack/${trackId}`, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf
    }
  })
    .then((result) => {
      console.log(result)
      return result.json();
    })
    .then((data) => {
      console.log(data);
      productElement.parentNode.removeChild(productElement);
    })
    .catch((err) => {
      console.log(err);
    });
};



