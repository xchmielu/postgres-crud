import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      `SELECT * FROM users ORDER BY id ASC;`
    );
    return res.status(200).json(response.rows);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query({
      text: "SELECT * FROM users WHERE id = $1",
      values: [id]
    });
    return res.status(200).json(response.rows);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const addUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email } = req.body;
    await pool.query({
      text: "INSERT INTO users(name, email) VALUES($1,$2)",
      values: [name, email]
    });
    return res.status(201).json({
      message: "Succesfully added user",
      body: {
        user: {
          name,
          email
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const editUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const response: QueryResult = await pool.query({
      text: "UPDATE users SET (name,email)= ($2,$3) WHERE id = $1",
      values: [id, name, email]
    });
    return res.status(201).json({
      message: "Succesfully updated user",
      body: {
        user: {
          id,
          name,
          email
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query({
      text: "DELETE FROM users WHERE id = $1",
      values: [id]
    });
    return res.status(200).json({
      message: `Succesfully deleted user with id: ${id}`
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
