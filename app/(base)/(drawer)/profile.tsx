import { StyleSheet, TextInput, View } from "react-native";
import { PoppinsText } from "../../../components/StyledText";
import { SEO } from "../../../components/SEO";
import { blackColor } from "../../../constants/Colors";
import ProfileAvatar from "../../../components/ProfileAvatar";
import { Button } from "../../../components/Button";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useDeviceSize } from "../../../hooks/useDeviceSize";
import {
  UPDATE_AVATAR_MUTATION,
  UPDATE_USER_MUTATION,
  USER_QUERY,
} from "../../../graphql/user";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/client";
import { User } from "../../../types/user";
import { toast } from "react-toastify";
import { useStorage } from "../../../hooks/useStorage";
import { USER_KEY } from "../../../state/storageKeys";
import { useRecoilState } from "recoil";
import { GLOBAL_USER_STATE } from "../../../state/globalStateKeys";

type InputContainerProps = {
  children: ReactNode;
};

export default function ProfilePage() {
  const { isMobile } = useDeviceSize();
  const { data, loading: isUserLoading } = useQuery(USER_QUERY);
  const userData = data?.data as User | undefined;
  const { storeObject } = useStorage();
  const [globalUser, setUserGlobalState] = useRecoilState(GLOBAL_USER_STATE);
  const [userForm, setUserForm] = useState<UserForm>({
    nickName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [image, setImage] = useState();

  useEffect(() => {
    setUserForm({
      nickName: userData?.nickname ?? "",
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      email: userData?.email ?? "",
      phone: userData?.phone ?? null,
      id: userData?.id,
      birthDate: userData?.birthDate,
      ban: userData?.ban,
      referralPercent: userData?.referralPercent,
      bio: userData?.bio,
    });

    if (userData) {
      setUserGlobalState(userData);
    }
  }, [userData]);

  const [photoUpload] = useMutation(UPDATE_AVATAR_MUTATION, {
    context: {
      hasUpload: true,
    },
    onError: (error) => {
      setImage(undefined);
      toast.error("Error Saving Avatar Image");
    },
    onCompleted: (data) => {
      if (data) {
        storeObject(USER_KEY, data);
        toast.success("Profile Avatar Updated Succesfully");
      }
    },
  });
  console.log("userForm", userForm);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      ...userForm,
      phone: userForm.phone === "" ? null : userForm.phone,
    },
    // context: {
    //   hasUpload: true,
    // },
    onError: (error) => {
      toast.error("Unable to save profile Personal Data!");
    },
    onCompleted: (data) => {
      if (data) {
        const updated = {
          ...globalUser,
          nickname: userForm.nickName,
        } as any;
        setUserGlobalState({ ...updated } as User);
        toast.success("Profile Updated Succesfully");
      }
    },
  });

  const InputContainer = ({ children }: InputContainerProps) => (
    <View
      style={[
        { display: "flex", gap: 18, flexDirection: "row" },
        isMobile ? { flexDirection: "column" } : {},
      ]}
    >
      {children}
    </View>
  );

  //@ts-ignore
  const handleFileSelected = async (e) => {
    const img = e.target.files[0];
    if (img) {
      // @ts-ignore
      setImage(URL.createObjectURL(img));
      toast.promise(
        photoUpload({
          variables: { userId: userData?.id, file: img },
        }),
        {
          pending: "Uploading Avatar Profile Image",
        }
      );
    }
  };

  const placeholderColor = "#707070";
  return (
    <>
      <SEO title={"My Profile"} description={"My Profile"} />
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={[style.container, isMobile ? { flexDirection: "column" } : {}]}
        >
          <View style={style.avatarContainer}>
            <ProfileAvatar
              url={image ?? userData?.avatar}
              size={isMobile ? 100 : 200}
            />
            {!isMobile && (
              <View style={style.button}>
                <input
                  style={{
                    zIndex: 4,
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                  onChange={handleFileSelected}
                  type="file"
                  accept="image/png"
                ></input>
                <PoppinsText style={{ color: blackColor }}>
                  ADD PHOTO
                </PoppinsText>
              </View>
            )}
          </View>
          <View
            style={[
              style.inputsContainer,
              isMobile ? { flexDirection: "column" } : {},
            ]}
          >
            <View style={[style.inputsContainer, { marginVertical: "auto" }]}>
              <PoppinsText
                style={{
                  fontSize: 30,
                  fontWeight: "900",
                  // flex: 1,
                  paddingTop: 20,
                }}
              >
                Personal Data
              </PoppinsText>
              <InputContainer>
                <TextInput
                  key={"Nickname"}
                  placeholder="Nickname"
                  defaultValue={userForm.nickName}
                  placeholderTextColor={placeholderColor}
                  style={style.textbox}
                  onBlur={({ nativeEvent }) =>
                    setUserForm({ ...userForm, nickName: nativeEvent.text })
                  }
                />
                <TextInput
                  key={"Email"}
                  placeholder="Email"
                  defaultValue={userForm.email}
                  style={style.textbox}
                  placeholderTextColor={placeholderColor}
                  onBlur={({ nativeEvent }) =>
                    setUserForm({ ...userForm, email: nativeEvent.text })
                  }
                />
              </InputContainer>
              <InputContainer>
                <TextInput
                  key={"First Name"}
                  autoCapitalize="words"
                  placeholder="First Name"
                  defaultValue={userForm.firstName}
                  style={style.textbox}
                  placeholderTextColor={placeholderColor}
                  onBlur={({ nativeEvent }) =>
                    setUserForm({ ...userForm, firstName: nativeEvent.text })
                  }
                />
                <TextInput
                  key={"Last Name"}
                  placeholder="Last Name"
                  autoCapitalize="words"
                  defaultValue={userForm.lastName}
                  style={style.textbox}
                  placeholderTextColor={placeholderColor}
                  onBlur={({ nativeEvent }) =>
                    setUserForm({ ...userForm, lastName: nativeEvent.text })
                  }
                />
              </InputContainer>
              <InputContainer>
                <TextInput
                  key={"Phone Number"}
                  placeholder="Phone Number"
                  defaultValue={userForm.phone ?? ""}
                  style={style.textbox}
                  placeholderTextColor={placeholderColor}
                  onBlur={({ nativeEvent }) =>
                    setUserForm({ ...userForm, phone: nativeEvent.text })
                  }
                />
                <View style={{ width: "50%" }}></View>
              </InputContainer>

              <Button
                style={{ paddingBottom: 20 }}
                onPress={async () => await updateUser()}
              >
                <PoppinsText style={style.saveButton}>Save changes</PoppinsText>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

type UserForm = {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  id?: any;
  birthDate?: any;
  ban?: any;
  referralPercent?: number;
  bio?: any;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blackColor,
    // padding: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    overflowY: "scroll",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  inputsContainer: {
    flex: 2,
    gap: 18,
    // alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
    color: blackColor,
  },
  textbox: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    height: 50,
    color: "#fff",
    borderColor: "#fff",
  },
  saveButton: {
    // flex: 1,
    width: "50%",
    maxWidth: 300,
    padding: 20,
    textTransform: "uppercase",
    color: blackColor,
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: 20,
    margin: "auto",
  },
});
