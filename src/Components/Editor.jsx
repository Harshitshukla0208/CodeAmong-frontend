import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../langsupport';
import logo from '../assets/logo.svg';
import './css/CodeEditor.css';
import { executeCode } from '../api';
import User from '../assets/user.png'

const CodeEditor = () => {
    const editorRef = useRef();
    const toast = useToast();

    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasRun, setHasRun] = useState(false); // Track whether the code has been executed
    const [showOutput, setShowOutput] = useState(false); // Track whether to show output

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(language, sourceCode);
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
            setHasRun(true); // Update the state when code has been executed
            setShowOutput(true); // Show output after running code
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: error.message || "Unable to run code",
                status: "error",
                duration: 6000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleOutput = () => {
        setShowOutput(!showOutput);
    };

    const isMobileView = window.innerWidth <= 500;

    return (
        <Box className='main-container'>
            <Box className='chat-box' w="22%">

            </Box>
            <Box minH="100vh" bg="#000" color="gray.500" px={6} py={8} className='main-box' w="78%">
                <div className='logo-container'>
                    <Link to='/' className='logo'>
                        <img src={logo} alt="Logo" className="logo-img" />
                        <h1 className="logo-text">CodeAmong</h1>
                    </Link>
                </div>
                <div className='buttons'>
                    <LanguageSelector language={language} onSelect={onSelect} />

                        <Button className='return-btn' onClick={toggleOutput} colorScheme="blue" style={{ fontSize: '13px',marginLeft: '5px' }}>
                            Return
                        </Button>

                    <Button className='runcode-btn' variant='outline' colorScheme='green' isLoading={isLoading} onClick={runCode}>
                        Run Code
                    </Button>

                </div>
                {isMobileView ? (
                    <Box className='editor-boxes'>
                        {!showOutput && (
                            <Editor
                                className={hasRun ? 'left' : 'left-side'} // Conditionally set the class name
                                height="90vh"
                                width={isMobileView ? "100%" : "50%"}
                                theme='vs-dark'
                                language={language}
                                defaultValue={CODE_SNIPPETS[language]}
                                onMount={onMount}
                                value={value}
                                onChange={(value) => setValue(value)}
                            />
                        )}
                        {showOutput && (
                            <Box
                                className='right' // Conditionally set the class name
                                height="90vh"
                                p={2}
                                color={isError ? "red.400" : ""}
                                border="1px solid"
                                borderRadius={4}
                                borderColor={isError ? "red.500" : "#333"}
                                width={isMobileView ? "100%" : "50%"}
                            >
                                {output ? output.map((line, i) => <Text key={i}>{line}</Text>) : 'Click "Run Code" to see the output here'}
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box className='editor-boxes'>
                        {!showOutput && (
                            <Editor
                                className={hasRun ? 'left' : 'left-side'} // Conditionally set the class name
                                height="70vh"
                                width={isMobileView ? "50%" : "100%"}
                                theme='vs-dark'
                                language={language}
                                defaultValue={CODE_SNIPPETS[language]}
                                onMount={onMount}
                                value={value}
                                onChange={(value) => setValue(value)}
                            />
                        )}
                        {showOutput && (
                            <Box
                                className='right' // Conditionally set the class name
                                height="70vh"
                                width="100%"
                                p={2}
                                color={isError ? "red.400" : ""}
                                border="1px solid"
                                borderRadius={4}
                                borderColor={isError ? "red.500" : "#333"}
                                // width={isMobileView ? "100%" : "50%"}
                            >
                                {output ? output.map((line, i) => <Text key={i}>{line}</Text>) : 'Click "Run Code" to see the output here'}
                            </Box>
                        )}
                    </Box>
                )}
                <Box className='user-main-box'>
                    <Box className='user-box'>
                        <img src={User} className='user-img' />
                        <img src={User} className='user-img' />
                        <img src={User} className='user-img' />
                        <img src={User} className='user-img' />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
    
};

export default CodeEditor;