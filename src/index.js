
function test() {

  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me ', {
    headers: {
      authorization: 'e807f0be-4a7f-40ad-a75f-bff7cd3e53ea'
    }
  })
    .then(res => res.json())
    .then((result) => {
      // console.log(result);
      return result
    });
}
const a = test()
console.log(a);