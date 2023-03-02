import React from 'react'
import "./styleRegister.css"
import { ChakraProvider } from '@chakra-ui/react'
//import { useNavigate } from "react-router-dom";
//import { goToRegisterPage} from "../../router/coordinator";
import {
    Flex,
    Text,
    Box,
    FormControl,
    Checkbox,
    Link,
    Input,
    Stack,
} from '@chakra-ui/react';
import Header from '../../components/Header';


const Register = () => {

    //const navigate = useNavigate()

    return (
        <div>
            <Header />
            <ChakraProvider>
                <Flex
                    direction={'column'}
                    justify={'center'}
                    align={'center'}
                >
                    <Text
                        pt={20}
                        p={10}
                        pb={40}
                        as='b'
                        fontSize='4xl'>Olá, boas vindas ao LabEddit ;)</Text>
                    <Stack >
                        <Box
                            w='420px'
                            rounded={'lg'}
                            p={8}>
                            <Stack spacing={55}>
                                <Stack spacing={1}>
                                    <FormControl id="apelido">
                                        <Input
                                            p={26}
                                            borderRadius={"4px"}
                                            type="name" placeholder="Apelido" />
                                    </FormControl>
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
                                    fontSize='sm'
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Text>Ao continuar, você concorda com o nosso
                                        <Link color={'blue.400'}> Contrato de usuário</Link> e nossa<Link color={'blue.400'}> Política de privacidade</Link>
                                    </Text>
                                    <Checkbox>
                                        <Text
                                            fontSize='sm'>Eu concordo em receber emails sobre coisas legais no Labeddit
                                        </Text>
                                    </Checkbox>

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
                                        Cadastrar
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

export default Register