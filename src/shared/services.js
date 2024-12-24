import Helper from "shared/helper";
import { apiUrl as serverApi } from "config";

const GetEntityInfo = async (name) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}${name}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}



 


	    
	 	
	
		
/* Orders */

const GetOrdersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Orders/$count`;
        if (query) url = `${serverApi}Orders/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetOrdersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Orders`;
        if (query) url = `${serverApi}Orders?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetOrderSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Orders(${id})`;
        if (params) {
            url = `${serverApi}Orders(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetOrderSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.OrderId;
        let method = "POST";
        let url = `${serverApi}Orders`;
        if (input.OrderId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Orders(${input.OrderId})`;
        } else if (input.OrderId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Orders(${input.OrderId})`;
        }

        delete input['OrderId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.OrderId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */

const SetOrderProductsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, OrderId, ProductId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}OrderProductss`;
        let data = { ProductId, OrderId: OrderId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}OrderProductss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}OrderProductss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetOrderProductsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}OrderProductss?$filter=OrderId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Payments */

const GetPaymentsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Payments/$count`;
        if (query) url = `${serverApi}Payments/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetPaymentsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Payments`;
        if (query) url = `${serverApi}Payments?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPaymentSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Payments(${id})`;
        if (params) {
            url = `${serverApi}Payments(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetPaymentSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.PaymentId;
        let method = "POST";
        let url = `${serverApi}Payments`;
        if (input.PaymentId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Payments(${input.PaymentId})`;
        } else if (input.PaymentId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Payments(${input.PaymentId})`;
        }

        delete input['PaymentId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.PaymentId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   		
	
	    
	 	
	
		
/* Categories */

const GetCategoriesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Categories/$count`;
        if (query) url = `${serverApi}Categories/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetCategoriesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Categories`;
        if (query) url = `${serverApi}Categories?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCategorySingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Categories(${id})`;
        if (params) {
            url = `${serverApi}Categories(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetCategorySingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CategoryId;
        let method = "POST";
        let url = `${serverApi}Categories`;
        if (input.CategoryId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Categories(${input.CategoryId})`;
        } else if (input.CategoryId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Categories(${input.CategoryId})`;
        }

        delete input['CategoryId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CategoryId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetCategoryProductsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, CategoryId, ProductId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}CategoryProductss`;
        let data = { ProductId, CategoryId: CategoryId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}CategoryProductss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}CategoryProductss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCategoryProductsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}CategoryProductss?$filter=CategoryId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* ShoppingCarts */

const GetShoppingCartsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ShoppingCarts/$count`;
        if (query) url = `${serverApi}ShoppingCarts/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetShoppingCartsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}ShoppingCarts`;
        if (query) url = `${serverApi}ShoppingCarts?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetShoppingCartSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}ShoppingCarts(${id})`;
        if (params) {
            url = `${serverApi}ShoppingCarts(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetShoppingCartSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CartId;
        let method = "POST";
        let url = `${serverApi}ShoppingCarts`;
        if (input.CartId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}ShoppingCarts(${input.CartId})`;
        } else if (input.CartId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}ShoppingCarts(${input.CartId})`;
        }

        delete input['CartId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CartId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */

const SetShoppingCartProductsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, CartId, ProductId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ShoppingCartProductss`;
        let data = { ProductId, CartId: CartId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ShoppingCartProductss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ShoppingCartProductss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetShoppingCartProductsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ShoppingCartProductss?$filter=CartId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Customers */

const GetCustomersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Customers/$count`;
        if (query) url = `${serverApi}Customers/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetCustomersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Customers`;
        if (query) url = `${serverApi}Customers?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCustomerSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Customers(${id})`;
        if (params) {
            url = `${serverApi}Customers(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetCustomerSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CustomerId;
        let method = "POST";
        let url = `${serverApi}Customers`;
        if (input.CustomerId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Customers(${input.CustomerId})`;
        } else if (input.CustomerId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Customers(${input.CustomerId})`;
        }

        delete input['CustomerId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CustomerId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetCustomerOrdersJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, CustomerId, OrderId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}CustomerOrderss`;
        let data = { OrderId, CustomerId: CustomerId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}CustomerOrderss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}CustomerOrderss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCustomerOrdersJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}CustomerOrderss?$filter=CustomerId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Products */

const GetProductsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Products/$count`;
        if (query) url = `${serverApi}Products/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetProductsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Products`;
        if (query) url = `${serverApi}Products?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetProductSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Products(${id})`;
        if (params) {
            url = `${serverApi}Products(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetProductSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ProductId;
        let method = "POST";
        let url = `${serverApi}Products`;
        if (input.ProductId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Products(${input.ProductId})`;
        } else if (input.ProductId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Products(${input.ProductId})`;
        }

        delete input['ProductId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ProductId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   		
	
 


// Below is a reference function - a possible business logic for ecom reference app
const GetProductStatus = async (productId) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings?$filter=ProductId eq ${productId}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                let _tmp = { Status: '' };
                if (json.value && json.value.length > 0) {
                    _tmp = json.value[0];
                }
                return resolve({ status: res.ok, values: _tmp });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}




const GetMetaData = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}$metadata`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (res.status === 200) {
                const values = await res.text();
                return resolve({ status: res.ok, values });
            }

            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

/* Prodict List View Details */
const GetProductOnBoardings = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

export {
 GetEntityInfo,  GetOrdersCount, GetOrdersMulti, GetOrderSingle, SetOrderSingle, SetOrderProductsJoin, GetOrderProductsJoin, GetPaymentsCount, GetPaymentsMulti, GetPaymentSingle, SetPaymentSingle, GetCategoriesCount, GetCategoriesMulti, GetCategorySingle, SetCategorySingle, SetCategoryProductsJoin, GetCategoryProductsJoin, GetShoppingCartsCount, GetShoppingCartsMulti, GetShoppingCartSingle, SetShoppingCartSingle, SetShoppingCartProductsJoin, GetShoppingCartProductsJoin, GetCustomersCount, GetCustomersMulti, GetCustomerSingle, SetCustomerSingle, SetCustomerOrdersJoin, GetCustomerOrdersJoin, GetProductsCount, GetProductsMulti, GetProductSingle, SetProductSingle, GetProductStatus, GetMetaData, GetProductOnBoardings
};
