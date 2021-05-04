import SplitCalculator from "./splitCalculator";

describe("Split calculator", () => {

    function mockSettlement() {
        return {
            expenses: [
                {
                    amount: 1900,
                    id: 1,
                    message: "",
                    payedBy: "user1",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 200,
                    id: 1,
                    message: "",
                    payedBy: "user2",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 0,
                    id: 1,
                    message: "",
                    payedBy: "user3",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                }
            ],
            owner: "user1",
            title: "test settlement",
            users: [
                'user1',
                'user2',
                'user3'
            ]

        }
    }

    function mockSettlement2() {
        return {
            expenses: [
                {
                    amount: 1900,
                    id: 1,
                    message: "",
                    payedBy: "user1",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 100,
                    id: 1,
                    message: "",
                    payedBy: "user2",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 100,
                    id: 1,
                    message: "",
                    payedBy: "user2",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 0,
                    id: 1,
                    message: "",
                    payedBy: "user3",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                }
            ],
            owner: "user1",
            title: "test settlement",
            users: [
                'user1',
                'user2',
                'user3'
            ]

        }
    }

    function mockSettlement3() {
        return {
            expenses: [
                {
                    amount: 1000,
                    id: 1,
                    message: "",
                    payedBy: "user1",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 250,
                    id: 1,
                    message: "",
                    payedBy: "user2",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 0,
                    id: 1,
                    message: "",
                    payedBy: "user3",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 750,
                    id: 1,
                    message: "",
                    payedBy: "user4",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                }
            ],
            owner: "user1",
            title: "test settlement",
            users: [
                'user1',
                'user2',
                'user3',
                'user4'
            ]

        }
    }

    function mockSettlement4() {
        return {
            expenses: [
                {
                    amount: 234,
                    id: 1,
                    message: "",
                    payedBy: "user1",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 345,
                    id: 1,
                    message: "",
                    payedBy: "user2",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                },
                {
                    amount: 420,
                    id: 1,
                    message: "",
                    payedBy: "user3",
                    tag: {
                        color: "#fff",
                        title: "bills"
                    }
                }
            ],
            owner: "user1",
            title: "test settlement",
            users: [
                'user1',
                'user2',
                'user3'
            ]

        }
    }

/*
    it("Should run test", () => {
        expect(1+2).toBe(3);
    })

    it("Should mock settlement", () => {
        let settlement = mockSettlement();
        expect(settlement).not.toBeNull();
    })

    it("Should create a Split Calculator", () => {
        let calc = new SplitCalculator(mockSettlement());
        expect(calc).not.toBeNull();
    })

    it("Should get users by most payed descending", () => {
        let calc = new SplitCalculator(mockSettlement());
        let payedPerUser = calc.payedByUser;
        expect(payedPerUser[0].name).toBe('user3');
        expect(payedPerUser[1].name).toBe('user2');
        expect(payedPerUser[2].name).toBe('user1');
    })

    it("Should get target sum for each payer", () => {
        let calc = new SplitCalculator(mockSettlement());
       // calc.setTargetSum();
        expect(calc.targetSum).toBe(700);
    })

    it("Should see correct number of participants on calculator", () => {
        let calc = new SplitCalculator(mockSettlement());
        expect(calc.participants.length).toBe(3);
    })

    it("Should calculate the correct expenses for all membes1", () => {
        let calc = new SplitCalculator(mockSettlement());
        calc.settle();
        expect(calc.payedByUser[0].payed).toBe(700);
        expect(calc.payedByUser[1].payed).toBe(700);
        expect(calc.payedByUser[2].payed).toBe(700);
    })

    it("Should calculate the correct expenses for all membes2", () => {
        let calc = new SplitCalculator(mockSettlement2());
        calc.settle();
        expect(calc.payedByUser[0].payed).toBe(700);
        expect(calc.payedByUser[1].payed).toBe(700);
        expect(calc.payedByUser[2].payed).toBe(700);
    })

    it("Should calculate the correct expenses for all membes3", () => {
        let calc = new SplitCalculator(mockSettlement3());
        calc.settle();
        expect(calc.payedByUser[0].payed).toBe(500);
        expect(calc.payedByUser[1].payed).toBe(500);
        expect(calc.payedByUser[2].payed).toBe(500);
        expect(calc.payedByUser[3].payed).toBe(500);
    })
*/
    it("Should calculate the correct expenses for all membes2", () => {
        let calc = new SplitCalculator(mockSettlement4());
        calc.settle();
        expect(calc.payedByUser[0].payed).toBe(333);
        expect(calc.payedByUser[1].payed).toBe(333);
        expect(calc.payedByUser[2].payed).toBe(333);
        console.log('uuuuuuuuuu')
        console.log(calc);
        for(let i = 0; i < calc.payedByUser.length; i++) {
            console.log(calc.payedByUser[i].name,calc.payedByUser[i].ows)
        }
        
    })
})
