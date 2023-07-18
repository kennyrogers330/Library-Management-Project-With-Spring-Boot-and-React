import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveAReview } from "../Utils/LeaveAReview";
import Stripe from "react-stripe-checkout";
import axios from "axios";
export const CheckoutAndReviewBox: React.FC<{ book:
BookModel | undefined, mobile: boolean,
currentLoansCount: number, isAuthenticated: any, isCheckedOut: boolean 
checkoutBook: any,
isReviewLeft: boolean,

submitReview: any
}> = (props) => {

    async function handleToken(token:any) {
        console.log(token);
        await axios.post("http://localhost:8080/api/payment/charge", "", {         headers: {
          token: token.id,
          amount: 500,
        },}).then(() => {
            props.checkoutBook();
           alert("Payment Success");
           }).catch((error: any) => {
           alert(error);
           });
        }
   
    function buttonRender(){
        if (props.isAuthenticated) {
            if(!props.isCheckedOut && props.currentLoansCount < 5){
                // return (<button onClick={() => props.checkoutBook()} className="btn btn-success btn-lg">Checkout</button>)
                return(
                    <Stripe
                        stripeKey="pk_test_********************* Your public key from your stripe account"
                        token={handleToken}
                    />
                )
            } else if(props.isCheckedOut){
                return(<p><b>Book checked out. Enjoy!</b></p>)
            } else if(!props.isCheckedOut){
                return(<p className="text-danger">Too many books checked out</p>)
            }
        }

        return (<Link to={'/login'} className="btn btn-success btn-lg">Sign in</Link>)
    }

    function reviewRender(){
        if (props.isAuthenticated && !props.isReviewLeft){
            return(
            //<p>
                <LeaveAReview submitReview={props.submitReview}/>
            //</p>
            )
        }else if(props.isAuthenticated && props.isReviewLeft){
            return(
                <p>
                     <b>Thank you for your review</b>
                </p>
                )
        }
        return(
        <div>
            <hr/>
            <p>Sign in to be able to leave a review.</p>
        
        </div>)
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
             <div className="card-body container">
               <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {
                        props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
                            <h4 className="text-success">
                                Available
                            </h4>
                            :
                            <h4 className="text-danger">
                                Wait List
                            </h4>
                    }

                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div> 
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    This number can change until placing order has been complete. 
                </p>
                {reviewRender()}
             </div>
        </div>
    );
}