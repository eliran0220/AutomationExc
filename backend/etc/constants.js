/**
 * A constant which holds all the success and error messages.
 */
var Constants = Object.freeze({
    ID_ERROR : {message :"ID is empty, please enter a valid form of id"},
    ITEM_NOT_FOUND : {message: "The item is not found."},
    ITEM_ADDED_SUCCESS :{message:"Item has been added succesfully, the id is: "},
    ITEM_DELETE_SUCCESS: {message:"Item has been deleted succesfully."},
    ITEM_UPDATE_SUCCESS :{message:"Item has been updated succesfully."},
    NOT_ENOUGH_AMOUNT_ERROR :{message:"Not enough amount to withdraw! "},
    WITHDRAW_SUCCESS : {message:"Withdraw success, amount left is: "},
    DEPOSIT_SUCCESS : {message: "Deposit success, current amount is: "},
    AMOUNT_ERROR : {message: "The amount can't be negative or not an integer."}
    
  });

module.exports = Constants;