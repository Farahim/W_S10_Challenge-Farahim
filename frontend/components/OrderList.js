import React, { useEffect } from 'react'
import { fetchPizzaHx } from '../state/pizzaSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setSizeFilter, filterHistory } from '../state/filterSlice'

export default function OrderList() {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.pizza.loading)
    const error = useSelector(state => state.pizza.error)
    const pizzaSize = useSelector(state => state.pizza.sizeFilter)
    const history = useSelector(filterHistory)

    useEffect(() => {
        dispatch(fetchPizzaHx())
    }, [dispatch])

    const clickHandler = (size) => {
        dispatch(setSizeFilter(size))
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div id="orderList">
            <h2>Pizza Orders</h2>
            <ol>
                {history.map((pizza, index) => (
                    <li key={index}>
                        <div>
                            {pizza.customer} ordered a size {pizza.size} with {' '}
                            {pizza.toppings && pizza.toppings.length > 0
                                ? pizza.toppings.length
                                : 'no'}{' '}
                            toppings
                        </div>
                    </li>
                ))}
            </ol>
            <div id="sizeFilters">
                Filter by size:
                {
                    ['All', 'S', 'M', 'L'].map(size => {
                        const className = `button-filter${size === pizzaSize ? ' active' : ''}`
                        return (
                            <button
                                data-testid={`filterBtn${size}`}
                                className={className}
                                onClick={() => clickHandler(size)}
                                key={size}>{size}</button>
                        )

                    })
                }
            </div>
        </div>
    )
}