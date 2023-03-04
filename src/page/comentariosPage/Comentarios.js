
// import React from 'react'
// import Header from '../../components/Header'
// import { ChakraProvider } from '@chakra-ui/react'
// import {
//     Box,
//     Button,
//     Flex,
//     FormControl,
//     Textarea,
//     VStack,
// } from '@chakra-ui/react';
// import "./styles.css"

// const Posts = () => {

//     return (
//         <div>
//             <Header />
//             <ChakraProvider>
//                 <Flex
//                     align="center"
//                     justify="center"
//                     id="contact">
//                     <Box
//                         m={{ base: 5 }}
//                         p={{ base: 5 }}>
//                         <Box>
//                             <VStack spacing={5}>
//                                 <FormControl isRequired>

//                                     <Textarea
//                                         name="message"
//                                         placeholder="Escreva seu post..."
//                                         bg='#EDEDED'
//                                         borderRadius="xl"
//                                         rows={5}
//                                         w={350}
//                                         resize="none"
//                                     />
//                                 </FormControl>
//                                 <Button
//                                     colorScheme="linear(to-r, #FF6787, #FAB050)"
//                                     bgGradient='linear(to-r, #FF6787, #FAB050)'
//                                     color="white"
//                                     borderRadius="xl"
//                                     h={42}
//                                     w={350}
//                                     isFullWidth>
//                                     Postar
//                                 </Button>

//                             </VStack>
//                         </Box>
//                     </Box>
//                 </Flex>
//             </ChakraProvider>
//             <hr className="hr" />
//         </div>
//     )
// }

// export default Posts

import { useState } from 'react';
import Header from '../../components/Header'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Textarea,
  VStack,
  Text,
} from '@chakra-ui/react';
import "./styleComentarios.css"

const Comentarios = () => {
  const [comentariosContent,  setComentariosContent] = useState('');
  const [allComentarios, setAllComentarios] = useState([]);

  const handleComentarios = () => {
    if (comentariosContent.trim() !== '') {
      setAllComentarios([...allComentarios, comentariosContent]);
      setComentariosContent('');
    }
  }

  return (
    <div>
      <Header />
      <ChakraProvider>
        <Flex
          align="center"
          justify="center"
          id="contact">
          <Box
            m={{ base: 5 }}
            p={{ base: 5 }}>
            <Box>
              <VStack spacing={5}>
                <FormControl isRequired>

                  <Textarea
                    name="message"
                    placeholder="Adcionar comentário"
                    bg='#EDEDED'
                    borderRadius="xl"
                    rows={5}
                    w={350}
                    resize="none"
                    value={comentariosContent}
                    onChange={(e) => setComentariosContent(e.target.value)}
                  />
                </FormControl>
                <Button
                  colorScheme="linear(to-r, #FF6787, #FAB050)"
                  bgGradient='linear(to-r, #FF6787, #FAB050)'
                  color="white"
                  borderRadius="xl"
                  h={42}
                  w={350}
                  isFullWidth
                  onClick={handleComentarios}>
                  Responder
                </Button>

              </VStack>
            </Box>
          </Box>
        </Flex>
      </ChakraProvider>
      <hr className="hr" />
        <Box className="comentarios">
        {allComentarios.map((comentarios, index) => (
          <Box key={index} className="comentarios-box">
            <Text>{comentarios}</Text>
          </Box>
        ))}
      </Box>
      
      
    
    </div>
  )
}

export default Comentarios
