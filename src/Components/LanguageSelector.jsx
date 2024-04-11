import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { LANGUAGE_VERSIONS } from '../langsupport';
import './css/CodeEditor.css'

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({language, onSelect}) => {
    return (
        <Box ml={2} mb={4}>
            <div className="language-selector-container">
                <Menu isLazy>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blue">
                        {language}
                    </MenuButton>
                    <MenuList bg="black">
                        {languages.map(([lang]) => {
                            return (
                                <MenuItem key={lang}
                                    color = {
                                        lang === language ? "blue.400" : ""
                                    }
                                    bg = {
                                        lang === language ? "gray.900" : "transparent"
                                    }
                                    _hover = {{
                                        color:"blue.400",
                                        bg:"gray.900"
                                    }}
                                    onClick={() => onSelect(lang)}
                                >
                                    <Text>
                                        {lang}&nbsp;
                                    </Text>
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
            </div>
        </Box>
    );
};

export default LanguageSelector;