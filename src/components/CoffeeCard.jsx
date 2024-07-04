import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, quantity, supplier, taste, category, details, photo } =
    coffee;

  const handleDelete = _id => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        fetch(`http://localhost:5000/coffee/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });

                  const remaining = coffees.filter(cof => cof._id !== id)
                  setCoffees(remaining);
            }
        })
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl my-8 p-4">
      <figure>
        <img className="w-96 rounded-md" src={photo} alt={`${name} photo`} />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <div className="">
            <h2 className="card-title mb-4">{name || "Unknown Coffee"}</h2>
            <p className="mb-2">{quantity || "Quantity not specified"}</p>
            <p className="mb-2">{supplier || "Supplier not specified"}</p>
            <p className="mb-2">{taste || "Taste not specified"}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button className="btn btn-outline w-12 h-12 bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </button>
            <Link to={`/updateCoffee/${_id}`}>
            <button className="btn btn-outline w-12 h-12 bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-outline w-12 h-12 bg-gray-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CoffeeCard.propTypes = {
  coffee: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.string,
    supplier: PropTypes.string,
    taste: PropTypes.string,
    category: PropTypes.string,
    details: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default CoffeeCard;
