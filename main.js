const TypePlay = {
  TRAGEDY: "tragedy",
  COMEDY: "comedy"
}

function getAmountPlay (objPlay) {
  let result = 0;

  switch (objPlay.type) {
    case TypePlay.TRAGEDY:
      result = 40000;

      if (objPlay.audience > 30) {
        result += 1000 * (objPlay.audience - 30);
      }

      break;

    case TypePlay.COMEDY:
      result = 30000;

      if (objPlay.audience > 20) {
        result += 10000 + 500 * (objPlay.audience - 20);
      }

      result += 300 * objPlay.audience;
      break;

    default:
      throw new Error(`неизвестный тип: ${objPlay.type}`);
  }

  return result;
}

function getVolumeCredits (objPlay) {
  let result = Math.max(objPlay.audience - 30, 0);

  if (TypePlay.COMEDY === objPlay.type) {
    result += Math.floor(objPlay.audience / 5);
  }

  return result;
}

function getTotalVolumeCredits () {
  let volumeCredits = 0;

  for (let perf of invoice.performance) {
    volumeCredits += getVolumeCredits(perf);
  }

  return volumeCredits;
}


function getRuble (number) {
  return new Intl.NumberFormat("ru-RU",
                  { style: "currency", currency: "RUB",
                  minimumFractionDigits: 2 }).format(number);
}

function getInvoice (invoice) {
  let totalAmount = 0;

  let result = `Счет для ${invoice.customer}\n`;

  for (let perf of invoice.performance) {
    result += ` ${perf.playId}: ${getRuble(getAmountPlay(perf) / 100)}`;
    result += ` (${perf.audience} мест)\n`;

    totalAmount += getAmountPlay(perf);
  }

  result += `Итого с вас ${getRuble(totalAmount / 100)}\n`;
  result += `Вы заработали ${getTotalVolumeCredits()} бонусов\n`;

  return result;
}
