import {Card, Button, Container, Row, Col, CardImg, CardText, CardBody,
CardTitle, CardSubtitle, NavLink} from'reactstrap';
import {Component} from 'react';
import { useHistory, Link } from 'react-router-dom';
import Loading from './LoadingComponent';

let content;

 function renderProducts(shoes, addShoeToCart){
    for(let i in shoes){
            content.push(
               <Row>
                 <Col xs="6" sm="4">
                <Card key={shoes[i].id}>
                <CardImg variant="top" 
                src={shoes[i].url}/>
                <CardBody>
                <CardTitle>{shoes[i].name}</CardTitle>
                <CardText>${shoes[i].price}</CardText>
                <Link to={{
                   pathname: `/shoe/${shoes[i].id}`,
                   state : {
                    shoe:shoes[i],
                    //addShoeToCart: addShoeToCart
                  }
                }}>
               <Button variant="primary">Click</Button>
               </Link>
                </CardBody>
            </Card>
            </Col>
           

        
                 <Col xs="6" sm="4">
                <Card key={shoes[i].id}>
                <CardImg variant="top" 
                src={shoes[i].url}/>
                <CardBody>
                <CardTitle>{shoes[i].name}</CardTitle>
                <CardText>${shoes[i].price}</CardText>
                <Link to={{
                   pathname: `/shoe/${shoes[i].id}`,
                   state : {
                    shoe:shoes[i],
                    //addShoeToCart: addShoeToCart
                    
                  }

                }}>
               <Button variant="primary" >Click</Button>
               </Link>
                </CardBody>
            </Card>
            </Col>
            

    
                 <Col xs="6" sm="4">
                <Card key={shoes[i].id}>
                <CardImg variant="top" 
                src={shoes[i].url}/>
                <CardBody>
                <CardTitle>{shoes[i].name}</CardTitle>
                <CardText>${shoes[i].price}</CardText>
                <Link to={{
                   pathname: `/shoe/${shoes[i].id}`,
                   state : {
                    shoe:shoes[i],
                   // addShoeToCart: addShoeToCart

                   }
                }}>
               <Button variant="primary">Click</Button>
               </Link>
                </CardBody>
            </Card>
            </Col>
  

            </Row>

            );
        }
    }

   const Store = (props) => {

    if (!props.shoes) {
        return (

        <div>
          <Loading/>
        </div>

     );
    }
    else if(props.shoes.length === 0){
        return (
            <div>
              <Loading/>
            </div>
         );
    }
    else{
        
        content = [props.shoes.length];

        console.log(props.addShoeToCart);
        
        renderProducts(props.shoes[0], props.addShoeToCart);
        return(
            <Container className="res">
                {content}
            </Container>
        );

    }
    }

export default Store;