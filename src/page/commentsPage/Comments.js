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
import "./styleComments.css"

const Comments = () => {
  const [commentsContent, setCommentsContent] = useState('');
  const [allComments, setAllComments] = useState([]);

  const handleComments = () => {
    if (commentsContent.trim() !== '') {
      setAllComments([...allComments, commentsContent]);
      setCommentsContent('');
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
                    placeholder="Adicionar comentário"
                    bg='#EDEDED'
                    borderRadius="xl"
                    rows={5}
                    w={350}
                    resize="none"
                    value={commentsContent}
                    onChange={(e) => setCommentsContent(e.target.value)}
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
                  onClick={handleComments}>
                  Responder
                </Button>

              </VStack>
            </Box>
          </Box>
        </Flex>
      </ChakraProvider>
      <hr className="hr" />
      <Box className="comments">
        {allComments.map((comments, index) => (
          <Box key={index} className="comments-box">
            <Text>{comments}</Text>
          </Box>
        ))}
      </Box>



    </div>
  )
}

export default Comments
