import { useCallback, useEffect, useMemo, useState } from "react";
import User from "../infrastructure/models/user";
import UserRepository from "../repositories/user_repository";

function useUser(userRepository: UserRepository, onUserCreated: () => void) {
  const [user, setUser] = useState<User | null>(null);
  const [isInternetErrorRisen, setIsInternetErrorRisen] = useState(false);
  const [isUserUsernameInvalid, setIsUserUsernameInvalid] = useState(false);
  const createUser = useCallback(async (username: string) => {
    if (username) {
      setIsUserUsernameInvalid(false);

      try {
        const createdUserOnService =
          await userRepository.getCreatedUser(username);

        setIsInternetErrorRisen(false);

        setUser(createdUserOnService);

        onUserCreated();
      } catch (_) {
        setIsInternetErrorRisen(true);
      }
    } else {
      setIsUserUsernameInvalid(true);
    }
  }, []);

  useEffect(() => {
    userRepository
      .getUser()
      .then((userFromDatabase) => {
        setUser(userFromDatabase);

        onUserCreated();
      })
      .catch(() => {});
  }, []);

  return useMemo(
    () => ({
      user,
      isInternetErrorRisen,
      isUserUsernameInvalid,
      createUser,
    }),
    [user, isInternetErrorRisen, isUserUsernameInvalid],
  );
}

export default useUser;
