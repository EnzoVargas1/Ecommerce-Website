import {Card, Button, Container, Row, Col, Pagination, PaginationItem} from'reactstrap';
import {Navigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';

const ShoePage = (props) => {

    const [Size, setSize] = useState(props.shoe[0].size);
    const[selectedShoe, setSelectedShoe] = useState(props.shoe[0]);
    
    useEffect(() => {
        // take action when isVisible Changed
        //console.log("useEffect: "  + Size);
        if(localStorage.getItem('token') != null){
             search(selectedShoe.sku);
        }
        //console.log(selectedShoe);
     }, [Size, selectedShoe])

    let authorized = localStorage.getItem('token');
    let sizeOptions = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 
    8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14];

    var options = [];

    if (authorized === null) {
        return <Navigate to="/login" replace />
    }
   
     let stock = props.shoes[0];
     const data = props.shoe[0];


     const search = (sku) => {
        setSelectedShoe(stock.filter((shoe) => (shoe.sku == sku && shoe.size == Size) && shoe.inStock === true)[0]);
     }

     const handleClick = (option) => {
        setSize(option);    
        search(data.sku);
     }

     function changeColor(option){
        if(option === Size){
            return "red";
        }
        else{
            return "white";
        }
     }

     function renderSizeOptions (options, sizeOptions) {
        options = sizeOptions.map((option) => {
            options.push(
                  <PaginationItem onClick={() => {handleClick(option)}} 
                  style={{border:'5px solid  black', backgroundColor: changeColor(option)}}
                  className="hover-effect">
                    <h5>{option}M</h5>
                    <h5>{option + 1.5}F</h5>
                  </PaginationItem>
           );
       })
    }
    renderSizeOptions(options, sizeOptions);

    
   

    return (
        <div>
        <Container>
        <Row>
            <Col>
            <Row xs="8" className="selected-image" style={{border:'5px solid  black'}}>
            <img src={data.url}
            width="500px" height="400px"/>
            <Col>
             <h1>{data.name}</h1>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <Row>
              <Col>
             <Button size="md"  color="danger" onClick={props.addShoeToCart(selectedShoe)} href="/cart">Buy Now</Button>
             </Col>
             <Col>
             <Button color="danger" onClick={props.addShoeToCart(selectedShoe)} href="/cart">Add To Cart</Button>
             </Col>
             </Row>
             </Col>
            </Row>
            <Row>
            <h2>Price: ${data.price}</h2> 
            <br/> 
            </Row>
            <Row>
               <Pagination aria-label="Page navigation example"
               size="sm">
               {options}
               </Pagination>
         </Row>
         </Col>
         

        </Row>

         </Container>
        </div>
    );
}

export default ShoePage;