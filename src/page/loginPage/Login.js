import React from 'react'
import imgLogo from "../../assets/img/imgLogo.png"
import "./styleLogin.css"
import { ChakraProvider } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { goToRegisterPage } from "../../router/coordinator";
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
} from '@chakra-ui/react';


const Login = () => {

  const navigate = useNavigate()

  return (
    <div>
      <div className='div-login'>
        <img className="img" src={imgLogo} alt="Logo img" />
        <p className="labeddit">LabEddit</p>
        <p className="paragrafo">O projeto de rede social da Labenu</p>
      </div>
      <ChakraProvider>
        <Flex
          justify={'center'}
        >
          <Stack >
            <Box
              w='420px'
              rounded={'lg'}
              p={8}>
              <Stack spacing={55}>
                <Stack spacing={1}>
                  <FormControl id="email">
                    <Input
                      p={26}
                      borderRadius={"4px"}
                      type="email" placeholder="E-mail" />
                  </FormControl>
                  <FormControl id="password">
                    <Input
                      p={26}
                      borderRadius={"4px"}
                      type="password" placeholder="Senha" />
                  </FormControl>
                </Stack>

                <Stack
                  spacing={4}>
                  <Box
                    as='button'
                    fontWeight='semibold'
                    fontSize={20}
                    p={3}
                    color='white'
                    borderRadius='30'
                    bgGradient='linear(to-r, #FF6787, #FAB050)'
                  >
                    Continuar
                  </Box>
                  <hr
                    className="hr" />

                  <Box
                    as='button'
                    p={3}
                    fontWeight='bold'
                    fontSize={20}
                    color='#FE7E02'
                    borderRadius='30'
                    border='1px'
                    bg='white'
                    onClick={() => goToRegisterPage(navigate)}
                  >
                    Crie uma conta!
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </ChakraProvider>

    </div>

  )
}

export default Login