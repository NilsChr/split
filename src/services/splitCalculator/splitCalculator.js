function SplitCalculator(settlement) {
  this.settlement = JSON.parse(JSON.stringify(settlement));
  this.participants = [...settlement.users];
  this.targetSum = 0;
  let totalExpenses = 0;
  this.settlement.expenses.forEach((e) => (totalExpenses += e.amount));
  this.targetSum = totalExpenses / this.participants.length;
  this.totalUserPayment = [];
  this.totalUserExpenses = [];

  this.payedByUser = this.participants
    .map((p) => {
      let payed = 0;
      settlement.expenses
        .filter((e) => e.payedBy === p)
        .forEach((e) => {
          payed += e.amount;
        });
      this.totalUserExpenses[p] = settlement.expenses.filter(
        (e) => e.payedBy === p
      ).length;

      this.totalUserPayment[p] = parseInt(payed);
      return {
        name: p,
        ows: [],
        gets: [],
        payed: payed,
        target: totalExpenses / this.participants.length,
      };
    })
    .sort((a, b) => {
      return a.payed - b.payed;
    });

  this.settle = function() {
    for (let i = 0; i < this.payedByUser.length; i++) {
      let lowest = this.payedByUser[i];
      if (lowest.payed == lowest.target) continue;
      for (let j = this.payedByUser.length - 1; j >= 0; j--) {
        if (lowest.payed == lowest.target) continue;

        let highest = this.payedByUser[j];
        if (highest.payed == highest.target) continue;

        let canPay = highest.payed - highest.target;
        if (canPay <= 0) continue;

        let needed = lowest.target - lowest.payed;

        if(needed > canPay) needed = canPay % needed;

        highest.payed -= needed;
        lowest.payed += needed;
        let pay = {
          value: needed.toFixed(2),
          user: highest.name,
        };
        lowest.ows.push(pay);

        let get = {
          value: needed.toFixed(2),
          user: lowest.name,
        };
        highest.gets.push(get);
      }
    }
  };
}

export default SplitCalculator;
