<?php

class UserDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['name'],
            $data['email'],
            bcrypt($data['password'])
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
        ];
    }
}
