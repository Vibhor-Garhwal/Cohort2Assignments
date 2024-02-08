import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 56 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        { name: 'Milk', value: 81 },
        // Add more items as needed
    ]);

    // Your code starts here
    const totalValue = React.useMemo(() => { 
        let total = 0;
        for (let i = 0; i < items.length; i++){
            total += items[i].value;
        }
        return total;
    },[items]);
    // Your code ends here
    // setItems([...items, { name: 'batata vada', value: 90 }]);
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: {totalValue}</p>
        </div>
    );
};

export default Assignment3;