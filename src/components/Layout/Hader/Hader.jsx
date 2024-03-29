import React from "react";
import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from 'react-icons/ri'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/actions/user";

const LinkButton = ({url='/' , title='Home',onClose}) => (
        <Link to= {url} onClick={onClose}>
        <Button variant={"ghost"}>{title}</Button>
    </Link>
    );

const Hader = ({isAuthenticated = false,user}) => {
    const {isOpen,onClose,onOpen}= useDisclosure();

    const dispatch=useDispatch(); 


    const logoutHandler = () => {
        onClose();
        dispatch(logOut())
    }

return(
    <>
     <ColorModeSwitcher />
     <Button 
     onClick={onOpen}
     colorScheme={"teal"} width="12" height={"12"} rounded= "full"
     position={"fixed"} top="6" left="6">
        <RiMenu5Fill />
     </Button>
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}> 
        <DrawerOverlay backdropFilter={'blur(5px)'}/>
        <DrawerContent>
            <DrawerHeader borderBottomWidth={'2px'}>Course Bundler</DrawerHeader>
            <DrawerBody>
                <VStack spacing={'4'} alignItems={"flex-start"}>
                    <LinkButton onClose={onClose} url="/" title="Home"/>
                    <LinkButton onClose={onClose} url="/courses" title="Browse All Courses"/>
                    <LinkButton onClose={onClose} url="/request" title="Request A course"/>
                    <LinkButton onClose={onClose} url="/contact" title="Contact Us"/>
                    <LinkButton onClose={onClose} url="/about" title="About"/>

                    <HStack justifyContent={"space-evenly"} 
                    position={"absolute"} 
                    bottom={"2rem"} 
                    width={"80%"}>
                        {isAuthenticated ?(
                        <>
                        <VStack>
                            <HStack>
                            <Link onClick={onClose} to="/profile">
                              <Button variant={'ghost'} colorScheme={"teal"}>Profile</Button>      
                            </Link>
                            <Button variant={'ghost'} onClick={logoutHandler}>
                                <RiLogoutBoxLine />
                                Log Out
                            </Button>
                            </HStack>
                        {
                            user && user.role==="admin" && <Link onClick={onClose} to= "/admin/dashboard">
                            <Button variant={'ghost'} colorScheme={"purple"}>
                                <RiDashboardFill style={{margin:'5px'}}/>
                                Dashboard
                            </Button>
                            </Link>
                        }

                        </VStack>
                        
                        </>
                        ):(
                        <>
                            <Link onClick={onClose} to="/login">
                              <Button colorScheme={"teal"} variant={'ghost'}>Login</Button>      
                            </Link>
                            <p> OR</p>
                            <Link onClick={onClose} to="/register">
                              <Button colorScheme={"teal"} variant={'ghost'}>Sign Up</Button>      
                            </Link>
                        </>
                        )};

                    </HStack>
                </VStack>
            </DrawerBody>
        </DrawerContent>

    </Drawer>
    </>
);

}
export default Hader;

