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
import ReactLoading from "react-loading";

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
  Col,
  Progress
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
      done: undefined,
      musica:[],
      prop:[],
      urlRequest:[],
      imagem:[]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ urlRequest: e.target.value });
  }

  handleClick() {
    this.setState({ show: !this.state.show });
    this.setState({ done: false }); 
    axios.post('/api/top/', {
      top: "37i9dQZEVXbMDoHDwVN2tF" 
    }).then((r) =>{ 
      console.log(r) 
      axios.post('/api/musica/', {
        musica: this.state.urlRequest 
      })
      .then((response) => {
        console.log(response)
        const musica = [response.data.features[0]]
        this.setState({ musica:musica });
        axios
        .get("/api/comp/")
        .then(res=>{
          console.log(res)
          const prop = [res.data];
          this.setState({ prop });
          this.setState({ done: true });
        }); 
      }, (error) => {
        console.log(error);
      });
    })
  }
  render() {
    return (
      <>
        {/* <DemoNavbar /> */}
        <main ref="main" class="bg-gradient-default">
          {/* <section className="section section-shaped section-lg"> */}
            <div className="shape shape-style-1 bg-gradient-default">
            </div>
              {this.state.prop.map((s) => {
                console.log({s})
                return(
                  <>
                  {!this.state.done ? (
                    <Container className="pt-lg-7">
                      <Row className="justify-content-center">
                        <Col lg="5">
                          <div className="btn-wrapper text-center">
                            <ReactLoading type={"bars"} color={"white"} />
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  ):(
                  <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                      <Col lg="5">
                        <Card className="bg-secondary shadow border-0">
                          <div className="btn-wrapper text-center">
                            <div className="text-center">
                              <h1>{Number(s.prop*100).toFixed(2)}%</h1>
                            </div>
                            <Progress max="100" value={Number(s.prop*100).toFixed(2)} color="green" />
                            <h3>{s.musica.track.name}  </h3>
                            <h3>{s.musica.track.artists[0].name}</h3>
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              href={s.musica.track.external_urls.spotify}
                            >
                              <img
                                className="maximo rounded-circle" 
                                alt="..."
                                src={s.musica.track.album.images[1].url}
                              />
                            </Button>
                          </div>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="success"
                              type="button"
                              href="/"
                            >
                            Fazer outra nusca
                            </Button>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                  )}
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
                          <h2>Adicione o link de compartilhamento Spotify da sua Música</h2>
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
                      
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Flip>
          {/* </section> */}
        </main>
      </>
    );
  }
}

export default Login;
