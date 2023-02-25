import React from "react";
import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from 'react-icons/ri'
import { Link } from "react-router-dom";

const LinkButton = ({url='/' , title='Home',onClose}) => (
        <Link to= {url} onClick={onClose}>
        <Button variant={"ghost"}>{title}</Button>
    </Link>
    );

const Hader = () => {
    const {isOpen,onClose,onOpen}= useDisclosure();
    const isAuth=true;
    const user= {
        role:"admin",
    }

    const logoutHandler = () => {
        console.warn("User logged out");
        onClose();
    }

return(
    <>
     <ColorModeSwitcher />
     <Button 
     onClick={onOpen}
     colorScheme={"pink"} width="12" height={"12"} rounded= "full"
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
                    <LinkButton onClose={onClose} url="/courses" title="Browes All Courses"/>
                    <LinkButton onClose={onClose} url="/request" title="Request A course"/>
                    <LinkButton onClose={onClose} url="/contact" title="Contact Us"/>
                    <LinkButton onClose={onClose} url="/about" title="About"/>

                    <HStack justifyContent={"space-evenly"} 
                    position={"absolute"} 
                    bottom={"2rem"} 
                    width={"80%"}>
                        {isAuth?(
                        <>
                        <VStack>
                            <HStack>
                            <Link onClick={onClose} to="/profile">
                              <Button variant={'ghost'} colorScheme={"pink"}>Profile</Button>      
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
                              <Button colorScheme={"pink"} variant={'ghost'}>Login</Button>      
                            </Link>
                            <p> OR</p>
                            <Link onClick={onClose} to="/register">
                              <Button colorScheme={"pink"} variant={'ghost'}>Sign Up</Button>      
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

