/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Flip from 'react-reveal/Flip';
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";


class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  constructor(props) {
    super(props);
    this.state = { 
      show: true,
      musica:[],
      prop:[],
      urlRequest:[]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ urlRequest: e.target.value });
  }

  handleClick() {
    axios.post('/api/top/', {
      top: "37i9dQZEVXbMDoHDwVN2tF" 
    })    
    axios.post('/api/musica/', {
      musica: this.state.urlRequest 
    })
    .then((response) => {
      const musica = [response.data.features[0]]
      this.setState({ musica:musica , show: !this.state.show });
      axios
      .get("/api/comp/")
      .then(res=>{
        const prop = [res.data];
        this.setState({ prop });
      }); 
    }, (error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <>
        {/* <DemoNavbar /> */}
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              {/* <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span /> */}
            </div>
            {this.state.musica.map(s => {
                return(
                  <li>{s.acousticness}</li>
                )
              })}
              {this.state.prop.map(s => {
                return(
                  <>
                    <li>{s.prop}</li>
                    <a href={s.musica.track.external_urls.spotify}>Veja musica Mais Parecida</a>
                  </>
                )
              })}
            <Flip left when={this.state.show} >
              <Container className="pt-lg-7">
                <Row className="justify-content-center">
                  <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                          <small>Adicione o link da sua Música</small>
                        </div>
                        <div className="btn-wrapper text-center">
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <span>
                              <img className="maximo" 
                                alt="..."
                                src={require("assets/img/icons/common/spot.svg")}
                              />
                            </span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form" onSubmit={this.handleSubmit}>
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-headphones" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Link" type="url" onChange={ this.handleChange }/>
                            </InputGroup>
                          </FormGroup>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="success"
                              type="button"
                              onClick={this.handleClick}
                              disabled={!this.state.show}
                            >
                            Fazer Busca
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Flip>
          </section>
        </main>
      </>
    );
  }
}

export default Login;
