interface sum {
    total: number
};

const Total = ( { total }: sum ) => <p> Number of exercises {total}</p>;

export default Total;