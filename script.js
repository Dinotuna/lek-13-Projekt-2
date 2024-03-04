document.addEventListener("DOMContentLoaded", function() {
  var addToCartButtons = document.querySelectorAll('.produkt button');

  var varukorgen = JSON.parse(localStorage.getItem('varukorgen')) || [];

  function updateVarukorgUI() {
    var varukorgenList = document.getElementById('varukorgenList');
    var totalSumElement = document.getElementById('totalSum');
    var totalSum = 0;

    varukorgenList.innerHTML = '';

    varukorgen.forEach(function(vara) {
      var listItem = document.createElement('li');
      listItem.textContent = `${vara.namn}: ${vara.pris} kr`;

      var removeButton = document.createElement('button');
      removeButton.textContent = 'Ta bort';
      removeButton.addEventListener('click', function() {
        removeFromVarukorg(vara);
      });

      listItem.appendChild(removeButton);
      varukorgenList.appendChild(listItem);

      totalSum += vara.pris;
    });

    totalSumElement.textContent = totalSum + ' kr';
  }

  addToCartButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
      addToVarukorg(index);
    });
  });

  function addToVarukorg(index) {
    var produkt = document.querySelectorAll('.produkt')[index];
    var namn = produkt.querySelector('p').innerText.trim();
    var prisText = produkt.querySelector('b').innerText;

    var pris = parseInt(prisText.replace(/\s+/g, '').replace('kr', ''));

    var vara = { namn: namn, pris: pris };
    varukorgen.push(vara);

    localStorage.setItem('varukorgen', JSON.stringify(varukorgen));

    updateVarukorgUI();
  }

  function removeFromVarukorg(vara) {
    varukorgen = varukorgen.filter(function(v) {
      return v !== vara;
    });

    localStorage.setItem('varukorgen', JSON.stringify(varukorgen));

    updateVarukorgUI();
  }

  updateVarukorgUI();
});
