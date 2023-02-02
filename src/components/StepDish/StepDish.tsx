import Button from 'components/Button'
import { Meal, Dish, SelectedDish } from 'constants/types'
import React, { useMemo } from 'react'

interface IDishEventsProps {
  removeSelectedDish: (rowId: number) => void
  updateSelectedDish: (rowId: number, dishId: number) => void
  updateDishQuantity: (rowId: number, quantity: number) => void
}

interface IStepDishProps extends IDishEventsProps {
  selectedMeal: Meal
  selectedRestaurant: string
  selectedDishes: Array<SelectedDish>
  dishes: Array<Dish>

  handleAddNewDishClick: () => void
}

function getRowAvailableOptions(
  availableDishes: Array<Dish>,
  selectedDishes: Array<SelectedDish>,
  id: number | undefined
) {
  const currentSelectedIds = selectedDishes.map((dish) => dish.id)
  return availableDishes.filter((item) => {
    if (item.id === id) return true
    return !currentSelectedIds.includes(item.id)
  })
}

export default function StepDish({
  selectedMeal,
  selectedRestaurant,
  selectedDishes,
  dishes,

  handleAddNewDishClick,
  removeSelectedDish,
  updateSelectedDish,
  updateDishQuantity
}: IStepDishProps) {
  const availableDishes = useMemo(() => {
    return dishes.filter(
      (item) =>
        item.restaurant === selectedRestaurant &&
        item.availableMeals.includes(selectedMeal)
    )
  }, [selectedMeal, selectedRestaurant, dishes])

  return (
    <div className="p-[16px]">
      <div className="mt-[8px]">
        <div>
          {selectedDishes.map((item) => (
            <DishSelectRow
              key={item.rowId}
              rowId={item.rowId}
              value={item.id}
              quantity={item.quantity}
              availableDishes={getRowAvailableOptions(
                availableDishes,
                selectedDishes,
                item.id
              )}
              updateSelectedDish={updateSelectedDish}
              updateDishQuantity={updateDishQuantity}
              removeSelectedDish={removeSelectedDish}
            />
          ))}
        </div>
        {availableDishes.length > selectedDishes.length && (
          <Button className="mt-[16px]" onClick={handleAddNewDishClick}>
            Add new dish
          </Button>
        )}
      </div>
    </div>
  )
}

interface IDishSelectRow extends IDishEventsProps {
  rowId: number
  value: number | undefined
  quantity: number
  availableDishes: Array<Dish>
}

function DishSelectRow({
  rowId,
  value,
  quantity,
  availableDishes,

  removeSelectedDish,
  updateSelectedDish,
  updateDishQuantity
}: IDishSelectRow) {
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    updateSelectedDish(rowId, Number(event.target.value))
  }

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateDishQuantity(rowId, Number(event.target.value))
  }

  function handleRemoveClick() {
    removeSelectedDish(rowId)
  }

  return (
    <div className="flex justify-between">
      <div>
        <label htmlFor={`dish-select-${rowId}`} className="block">
          Please Select a Dish
        </label>
        <select
          id={`dish-select-${rowId}`}
          className="w-full border-[1px] border-black py-[2px]"
          value={value}
          required
          onChange={handleSelectChange}
        >
          <option value="" hidden>
            ---
          </option>
          {availableDishes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`dish-quantity-input-${rowId}`} className="block">
          Servings
        </label>
        <input
          type="number"
          inputMode="numeric"
          min="1"
          max="10"
          id={`dish-quantity-input-${rowId}`}
          className="border-[1px] border-black px-[2px]"
          required
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <Button onClick={handleRemoveClick} className="self-end">
        X
      </Button>
    </div>
  )
}
